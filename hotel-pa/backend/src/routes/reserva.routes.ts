import { Router } from "express";
import { ReservaHotel } from "../models/ReservaHotel";
import { Huesped } from "../models/Huesped";
import { Habitacion } from "../models/Habitacion";
import { EstadoReserva } from "../models/Estadoreserva";

const router = Router();
const reservas: ReservaHotel[] = [];
const huespedes: Huesped[] = []; // Para simular base de datos
const habitaciones: Habitacion[] = [];

router.post("/", (req, res) => {
  const { id, huespedId, habitacionNumero, fechaInicio, fechaFin } = req.body;
  const huesped = huespedes.find(h => h.id === huespedId);
  const habitacion = habitaciones.find(h => h.numero === habitacionNumero);

  if (!huesped || !habitacion) return res.status(400).json({ mensaje: "Datos inválidos" });

  const nueva = new ReservaHotel(
    id,
    huesped,
    habitacion,
    new Date(fechaInicio),
    new Date(fechaFin),
    EstadoReserva.PENDIENTE
  );

  reservas.push(nueva);
  habitacion.reservar();

  res.status(201).json(nueva);
});

router.get("/", (req, res) => res.json(reservas));
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const r = reservas.find(r => r.id === id);
  if (!r) return res.status(404).json({ mensaje: "No encontrada" });
  res.json(r);
});

export default router;