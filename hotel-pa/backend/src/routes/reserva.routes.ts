import { Router } from "express";
import { ReservaService } from "../services/ReservaService";
import { FileReservaRepository } from "../repositories/file/FileReservaRepository";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { FileHuespedRepository } from "../repositories/file/FileHuespedRepository";

const router = Router();

const reservaRepo = new FileReservaRepository();
const habitacionRepo = new FileHabitacionRepository();
const huespedRepo = new FileHuespedRepository();

const service = new ReservaService(reservaRepo, habitacionRepo, huespedRepo);

// POST /reservas
router.post("/", (req, res) => {
  try {
    const { huespedId, habitacionId, fechaInicio, fechaFin } = req.body;

    const reserva = service.crear({
      huespedId: Number(huespedId),
      habitacionId: Number(habitacionId),
      // vienen como string desde JSON/Postman -> los convertimos
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    });

    res.status(201).json(reserva);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

// GET /reservas
router.get("/", (_req, res) => {
  res.json(reservaRepo.findAll());
});

// GET /reservas/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const r = reservaRepo.findById(id);
  if (!r) return res.status(404).json({ mensaje: "Reserva no encontrada" });
  res.json(r);
});

// PATCH /reservas/:id/confirmar
router.patch("/:id/confirmar", (req, res) => {
  try {
    const id = Number(req.params.id);
    const r = service.confirmar(id);
    res.json(r);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

// PATCH /reservas/:id/cancelar
router.patch("/:id/cancelar", (req, res) => {
  try {
    const id = Number(req.params.id);
    const r = service.cancelar(id);
    res.json(r);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

export default router;