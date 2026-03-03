import { Router } from "express";
import { FileFacturaRepository } from "../repositories/file/FileFacturaRepository";

const router = Router();
const repo = new FileFacturaRepository();

router.get("/", (_req, res) => {
  res.json(repo.findAll());
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const factura = repo.findById(id);
  if (!factura) return res.status(404).json({ mensaje: "Factura no encontrada" });
  res.json(factura);
});

router.post("/", (req, res) => {
  try {
    const all = repo.findAll();
    const id = all.length > 0 ? Math.max(...all.map((f) => f.id)) + 1 : 1;
    const numero = String(req.body.numero ?? `F001-${String(id).padStart(6, "0")}`);

    const creada = repo.create({
      id,
      numero,
      reservaId: Number(req.body.reservaId),
      pagoId: req.body.pagoId != null ? Number(req.body.pagoId) : null,
      fecha: String(req.body.fecha ?? new Date().toISOString()),
      total: Number(req.body.total),
      items: Array.isArray(req.body.items) ? req.body.items : [],
    });

    res.status(201).json(creada);
  } catch (e: any) {
    res.status(400).json({ mensaje: e.message ?? "Error" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const eliminado = repo.delete(id);
  if (!eliminado) return res.status(404).json({ mensaje: "Factura no encontrada" });
  res.json({ ok: true });
});

export default router;
