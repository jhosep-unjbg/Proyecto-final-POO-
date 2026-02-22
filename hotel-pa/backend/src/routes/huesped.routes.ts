import { Router } from "express";
import { Huesped } from "../models/Huesped";

const router = Router();
const huespedes: Huesped[] = [];

// Crear Huesped
router.post("/", (req, res) => {
  const { id, nombre, email, telefono } = req.body;
  const nuevo = new Huesped(id, nombre, email, telefono);
  huespedes.push(nuevo);
  res.status(201).json(nuevo);
});

// Listar todos
router.get("/", (req, res) => {
  res.json(huespedes);
});

// Obtener por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const encontrado = huespedes.find(h => h.id === id);
  if (!encontrado) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(encontrado);
});

// Actualizar
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const huesped = huespedes.find(h => h.id === id);
  if (!huesped) return res.status(404).json({ mensaje: "No encontrado" });

  huesped.nombre = req.body.nombre ?? huesped.nombre;
  huesped.email = req.body.email ?? huesped.email;
  huesped.telefono = req.body.telefono ?? huesped.telefono;

  res.json(huesped);
});

// Eliminar
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = huespedes.findIndex(h => h.id === id);
  if (index === -1) return res.status(404).json({ mensaje: "No encontrado" });

  huespedes.splice(index, 1);
  res.json({ mensaje: "Eliminado" });
});

export default router;