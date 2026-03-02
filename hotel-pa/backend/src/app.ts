import * as express from "express";
import { Request, Response } from "express"
import { RecepcionistaRepository } from "./repositories/file/FileRecepcionistaRepository";
import { RecepcionistaService } from "./services/RecepcionistaService";

const app = express.default();
app.use(express.json()); // 👈 IMPORTANTE para req.body

const recepRepo = new RecepcionistaRepository();
const recepService = new RecepcionistaService(recepRepo);

// health
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// recepcionistas
app.post("/recepcionistas", (req: Request, res: Response) => {
  try {
    const created = recepService.crear(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

app.get("/recepcionistas", (_req: Request, res: Response) => {
  res.json(recepService.listar());
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));