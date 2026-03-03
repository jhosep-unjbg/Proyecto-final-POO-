import { Router } from "express";
import { Turno } from "../models/enums/Turno";
import { RecepcionistaRepository } from "../repositories/file/FileRecepcionistaRepository";
import { RecepcionistaService } from "../services/RecepcionistaService";

const router = Router();
const service = new RecepcionistaService(new RecepcionistaRepository());

router.get("/", (_req, res) => {
  res.json(service.listar());
});

router.post("/", (req, res) => {
  try {
    const { nombres, apellidos, email, turno } = req.body;
    const turnoNormalizado = String(turno ?? "").toUpperCase() as Turno;

    if (!Object.values(Turno).includes(turnoNormalizado)) {
      return res.status(400).json({ mensaje: "Turno inválido. Usa MANANA, TARDE o NOCHE" });
    }

    const nuevo = service.crear({
      nombres: String(nombres),
      apellidos: String(apellidos),
      email: String(email),
      turno: turnoNormalizado,
      activo: false,
    });

    res.status(201).json(nuevo);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.patch("/:id/turno", (req, res) => {
  try {
    const id = Number(req.params.id);
    const recepcionista = service.listar().find((item) => item.id === id);
    if (!recepcionista) return res.status(404).json({ mensaje: "Recepcionista no encontrado" });

    const actualizado = service.update({
      ...recepcionista,
      activo: !recepcionista.activo,
    });

    res.json(actualizado);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

export default router;
