import { Router } from "express";
import { Huesped } from "../models/Huesped";

const router = Router();

router.post("/", (req, res) => {
  const { id, nombre, apellido, dni, telefono, email } = req.body;

  const nuevo = new Huesped(
    Number(id),
    String(nombre),
    String(apellido),
    String(dni),
    String(telefono),
    String(email)
  );

  res.status(201).json(nuevo);
});

export default router;