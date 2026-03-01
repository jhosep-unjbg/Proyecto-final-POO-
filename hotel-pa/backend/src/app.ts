import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./ormconfig";

import huespedRoutes from "./routes/huesped.routes";
import habitacionRoutes from "./routes/habitacion.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log("Conexión MySQL establecida"))
  .catch(err => console.error("Error DB:", err));

app.use("/huespedes", huespedRoutes);
app.use("/habitaciones", habitacionRoutes);

app.get("/", (req, res) => res.send("API Hotel PA dinámica funcionando 🚀"));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));