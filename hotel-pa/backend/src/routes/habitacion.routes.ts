import { Router } from "express";
import { HabitacionService } from "../services/HabitacionService";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion"; // ajusta si tu ruta es distinta

const router = Router();
const service = new HabitacionService();

router.get("/", (req, res) => {
  res.json(service.getAll());
});

router.get("/disponibles", (req, res) => {
  res.json(service.getDisponibles());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const habitacion = service.getById(id);

  if (!habitacion) return res.status(404).json({ message: "Habitación no encontrada" });
  res.json(habitacion);
});

router.post("/", (req, res) => {
  try {
    const nueva = service.create(req.body);
    res.status(201).json(nueva);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const actualizada = service.update(id, req.body);
    res.json(actualizada);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.patch("/:id/estado", (req, res) => {
  try {
    const id = Number(req.params.id);
    const estado = req.body.estado as EstadoHabitacion;
    const actualizada = service.cambiarEstado(id, estado);
    res.json(actualizada);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const ok = service.delete(id);
    if (!ok) return res.status(404).json({ message: "Habitación no encontrada" });
    res.json({ message: "Habitación eliminada" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

export default router;