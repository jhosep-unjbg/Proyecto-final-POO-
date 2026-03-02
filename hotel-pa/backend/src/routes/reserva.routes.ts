import { Router } from "express";
import { ReservaHotel } from "../models/ReservaHotel";
import { Huesped } from "../models/Huesped";
import { Habitacion } from "../models/Habitacion";
import { EstadoReserva } from "../models/enums/EstadoReserva";

const router = Router();

// Simulación de almacenamiento
const reservas: ReservaHotel[] = [];
const huespedes: Huesped[] = [];
const habitaciones: Habitacion[] = [];

router.post("/", (req, res) => {
  const { id, huespedId, habitacionId, fechaInicio, fechaFin } = req.body;

  const huesped = huespedes.find(h => h.id === Number(huespedId));
  const habitacion = habitaciones.find(h => h.id === Number(habitacionId));

  if (!huesped || !habitacion) {
    return res.status(400).json({ mensaje: "Huésped o habitación inválidos" });
  }

  const nueva = new ReservaHotel(
    Number(id),
    huesped.id,
    habitacion.id,
    new Date(fechaInicio),
    new Date(fechaFin),
    EstadoReserva.PENDIENTE
  );

  reservas.push(nueva);

  res.status(201).json(nueva);
});

router.get("/", (req, res) => {
  res.json(reservas);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const reserva = reservas.find(r => r.id === id);

  if (!reserva) {
    return res.status(404).json({ mensaje: "Reserva no encontrada" });
  }

  res.json(reserva);
});

export default router;