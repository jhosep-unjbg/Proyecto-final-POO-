import express from "express";
import { Cliente } from "./models/Clientes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Simulación base de datos en memoria
const clientes: Cliente[] = [];

// Ruta principal
app.get("/", (req, res) => {
  res.send("API Hotel PA funcionando ");
});

// Crear cliente
app.post("/clientes", (req, res) => {
  const { id, nombre, email, telefono } = req.body;

  const nuevoCliente = new Cliente(id, nombre, email, telefono);
  clientes.push(nuevoCliente);

  res.status(201).json({
    mensaje: "Cliente creado correctamente",
    cliente: nuevoCliente,
  });
});

// Listar clientes
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});