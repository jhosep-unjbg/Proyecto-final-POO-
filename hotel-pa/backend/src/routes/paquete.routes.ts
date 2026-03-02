import { Router } from "express";
// import { PaqueteService } from "../services/PaqueteService";
// import { FilePaqueteRepository } from "../repositories/file/FilePaqueteRepository";

const router = Router();

// const repo = new FilePaqueteRepository();
// const service = new PaqueteService(repo);

router.get("/", (_req, res) => {
  res.json([]); // luego lo conectamos al service
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  // const p = service.obtenerPorId(id);
  // if (!p) return res.status(404).json({ mensaje: "No encontrado" });
  res.json({ id });
});

router.post("/", (req, res) => {
  // const nuevo = service.crear(req.body);
  res.status(201).json({ ok: true, data: req.body });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json({ ok: true, id, data: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ ok: true, id: Number(req.params.id) });
});

export default router;