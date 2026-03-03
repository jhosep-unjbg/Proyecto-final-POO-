import { Router } from "express";
import { FileEstadiaRepository } from "../repositories/file/FileEstadiaRepository";
import { FileReservaRepository } from "../repositories/file/FileReservaRepository";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { EstadiaService } from "../services/EstadiaService";

const router = Router();

const estadiaRepo = new FileEstadiaRepository();
const reservaRepo = new FileReservaRepository();
const habitacionRepo = new FileHabitacionRepository();

const service = new EstadiaService(estadiaRepo, reservaRepo, habitacionRepo);

router.post("/checkin", (req, res) => {
  try {
    const { reservaId, fecha } = req.body;
    const e = service.checkIn(Number(reservaId), fecha ? new Date(fecha) : new Date());
    res.status(201).json(e);
  } catch (err: any) {
    res.status(400).json({ mensaje: err.message ?? "Error" });
  }
});

router.post("/checkout", (req, res) => {
  try {
    const { estadiaId, fecha } = req.body;
    const e = service.checkOut(Number(estadiaId), fecha ? new Date(fecha) : new Date());
    res.json(e);
  } catch (err: any) {
    res.status(400).json({ mensaje: err.message ?? "Error" });
  }
});

router.get("/", (_req, res) => {
  res.json(estadiaRepo.findAll());
});

export default router;