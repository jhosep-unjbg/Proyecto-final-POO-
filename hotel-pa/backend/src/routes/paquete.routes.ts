import { Router } from "express";
import { PaqueteTuristico } from "../models/PaqueteTuristico";
import { ReservaHotel } from "../models/ReservaHotel";

const router = Router();
const paquetes: PaqueteTuristico[] = [];
const reservas: ReservaHotel[] = [];

router.post("/", (req, res) => {
  const { id, nombre, reservasIds } = req.body;
  const reservasPaquete = reservas.filter(r => reservasIds.includes(r.id));
  const paquete = new PaqueteTuristico(id, nombre, reservasPaquete);
  paquetes.push(paquete);
  res.status(201).json(paquete);
});

router.get("/", (req, res) => res.json(paquetes));
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const p = paquetes.find(p => p.id === id);
  if (!p) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(p);
});

export default router;