import { Router } from "express";
import { PaqueteTuristico } from "../models/PaqueteTuristico";
import { FilePaqueteRepository } from "../repositories/file/FilePaqueteRepository";

const router = Router();
const repo = new FilePaqueteRepository();

router.get("/", (_req, res) => {
  res.json(repo.findAll());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const paquete = repo.findById(id);
  if (!paquete) return res.status(404).json({ mensaje: "No encontrado" });
  res.json(paquete);
});

router.post("/", (req, res) => {
  try {
    const all = repo.findAll();
    const id = all.length > 0 ? Math.max(...all.map((p) => p.id)) + 1 : 1;
    const nuevo = new PaqueteTuristico(
      id,
      String(req.body.nombre),
      String(req.body.descripcion ?? ""),
      Number(req.body.precio),
      String(req.body.moneda ?? "PEN"),
      req.body.activo == null ? true : Boolean(req.body.activo)
    );

    const creado = repo.create(nuevo);
    res.status(201).json(creado);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const actual = repo.findById(id);
    if (!actual) return res.status(404).json({ mensaje: "No encontrado" });

    const actualizado = repo.update({
      ...actual,
      nombre: req.body.nombre != null ? String(req.body.nombre) : actual.nombre,
      descripcion:
        req.body.descripcion != null ? String(req.body.descripcion) : actual.descripcion,
      precio: req.body.precio != null ? Number(req.body.precio) : actual.precio,
      moneda: req.body.moneda != null ? String(req.body.moneda) : actual.moneda,
      activo: req.body.activo != null ? Boolean(req.body.activo) : actual.activo,
    });

    res.json(actualizado);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const eliminado = repo.delete(id);
  if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
  res.json({ ok: true });
});

export default router;
