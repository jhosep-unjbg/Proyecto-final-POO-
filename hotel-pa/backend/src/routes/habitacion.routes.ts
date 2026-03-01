import { Router } from "express";
import { Habitacion } from "../models/Habitacion";
import { TipoHabitacion } from "../models/Tipohabitacion";

const router = Router();
const habitaciones: Habitacion[] = [];
const tiposHabitacion: TipoHabitacion[] = [
  new TipoHabitacion(1, "Doble", "Dos camas", 2),
  new TipoHabitacion(2, "Suite", "Suite deluxe", 4)
];

// Crear Habitación
router.post("/", (req, res) => {
  const { numero, tipoId, precioPorNoche } = req.body;
  const tipo = tiposHabitacion.find(t => t.id === tipoId);
  if (!tipo) return res.status(400).json({ mensaje: "Tipo no existe" });

  const nueva = new Habitacion(numero, tipo, precioPorNoche);
  habitaciones.push(nueva);
  res.status(201).json(nueva);
});

// Listar
router.get("/", (req, res) => {
  res.json(habitaciones);
});

// Obtener por numero
router.get("/:numero", (req, res) => {
  const numero = Number(req.params.numero);
  const hab = habitaciones.find(h => h.numero === numero);
  if (!hab) return res.status(404).json({ mensaje: "No encontrada" });
  res.json(hab);
});

// Actualizar
router.put("/:numero", (req, res) => {
  const numero = Number(req.params.numero);
  const hab = habitaciones.find(h => h.numero === numero);
  if (!hab) return res.status(404).json({ mensaje: "No encontrada" });

  hab.precioPorNoche = req.body.precioPorNoche ?? hab.precioPorNoche;
  res.json(hab);
});

// Eliminar
router.delete("/:numero", (req, res) => {
  const numero = Number(req.params.numero);
  const index = habitaciones.findIndex(h => h.numero === numero);
  if (index === -1) return res.status(404).json({ mensaje: "No encontrada" });

  habitaciones.splice(index, 1);
  res.json({ mensaje: "Eliminada" });
});

export default router;