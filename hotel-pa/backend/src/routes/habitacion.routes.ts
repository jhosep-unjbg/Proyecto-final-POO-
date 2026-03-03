import { Router } from "express";
import { HabitacionService } from "../services/HabitacionService";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";

const router = Router();

const repo = new FileHabitacionRepository();
const service = new HabitacionService(repo);

router.get("/", (req, res) => {
  res.json(service.listar());
});

router.get("/disponibles", (req, res) => {
  const disponibles = service.listar().filter(h => h.estado === EstadoHabitacion.DISPONIBLE);
  res.json(disponibles);
});

router.post("/", (req, res) => {
  try {
    const nueva = service.crear(req.body);
    res.status(201).json(nueva);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message });
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const actualizada = service.actualizar(id, req.body);
    res.json(actualizada);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message });
  }
});

router.patch("/:id/estado", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body as { estado: EstadoHabitacion };
    const actualizada = service.cambiarEstado(id, estado);
    res.json(actualizada);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message });
  }
});

router.get("/historial/precios", (req, res) => {
  const habitacionIdRaw = req.query.habitacionId;
  const habitacionId = habitacionIdRaw != null ? Number(habitacionIdRaw) : undefined;

  if (habitacionIdRaw != null && Number.isNaN(habitacionId)) {
    return res.status(400).json({ mensaje: "habitacionId inválido" });
  }

  res.json(service.historialCambiosPrecio(habitacionId));
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const habitacion = service.obtenerPorId(id);
  if (!habitacion) return res.status(404).json({ mensaje: "No encontrada" });
  res.json(habitacion);
});

router.patch("/:id/precio", (req, res) => {
  try {
    const id = Number(req.params.id);
    const { precioPorNoche } = req.body as { precioPorNoche: number };
    const rol = String(req.header("x-rol") ?? "");
    const adminUsuario = String(req.header("x-admin-usuario") ?? "admin");
    const actualizada = service.cambiarPrecio(id, Number(precioPorNoche), rol, adminUsuario);
    res.json(actualizada);
  } catch (e: any) {
    const status = e.message.includes("Solo el administrador") ? 403 : 400;
    res.status(status).json({ mensaje: e.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const ok = service.eliminar(id);
    if (!ok) return res.status(404).json({ mensaje: "No encontrada" });
    res.json({ ok: true });
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message });
  }
});

export default router;
