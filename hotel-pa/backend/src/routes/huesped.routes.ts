import { Router } from "express";
import { FileHuespedRepository } from "../repositories/file/FileHuespedRepository";
import { HuespedService } from "../services/HuespedService";

const router = Router();
const repo = new FileHuespedRepository();
const service = new HuespedService(repo);

router.post("/", (req, res) => {
  try {
    const { nombres, apellidos, dni, telefono, email } = req.body;
    const nuevo = service.crear({
      nombres: String(nombres),
      apellidos: String(apellidos),
      dni: String(dni),
      telefono: String(telefono),
      email: email != null ? String(email) : undefined,
    });

    res.status(201).json(nuevo);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.get("/", (req, res) => {
  const { nombres, apellidos, dni, telefono } = req.query;

  const hayFiltros = [nombres, apellidos, dni, telefono].some((value) => value != null && String(value).trim() !== "");

  if (!hayFiltros) {
    return res.json(repo.findAll());
  }

  const resultado = service.buscar({
    nombres: nombres != null ? String(nombres) : undefined,
    apellidos: apellidos != null ? String(apellidos) : undefined,
    dni: dni != null ? String(dni) : undefined,
    telefono: telefono != null ? String(telefono) : undefined,
  });

  return res.json(resultado);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const huesped = repo.findById(id);
  if (!huesped) return res.status(404).json({ mensaje: "Huésped no encontrado" });
  res.json(huesped);
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const actual = repo.findById(id);
    if (!actual) return res.status(404).json({ mensaje: "Huésped no encontrado" });

    const actualizado = repo.update({
      ...actual,
      nombre: req.body.nombres != null ? String(req.body.nombres) : actual.nombre,
      apellido: req.body.apellidos != null ? String(req.body.apellidos) : actual.apellido,
      dni: req.body.dni != null ? String(req.body.dni) : actual.dni,
      telefono: req.body.telefono != null ? String(req.body.telefono) : actual.telefono,
      email: req.body.email != null ? String(req.body.email) : actual.email,
    });

    res.json(actualizado);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const eliminado = repo.delete(id);
  if (!eliminado) return res.status(404).json({ mensaje: "Huésped no encontrado" });
  res.json({ ok: true });
});

export default router;
