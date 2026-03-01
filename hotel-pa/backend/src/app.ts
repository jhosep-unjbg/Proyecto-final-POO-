<<<<<<< HEAD
import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./ormconfig";

import huespedRoutes from "./routes/huesped.routes";
import habitacionRoutes from "./routes/habitacion.routes";
=======
import express from "express";
import huespedRoutes from "./routes/huesped.routes";
import habitacionRoutes from "./routes/habitacion.routes";
import reservaRoutes from "./routes/reserva.routes";
import paqueteRoutes from "./routes/paquete.routes";
>>>>>>> 9f5b2dc21898783bfc444d8a8fc09007c6b354ad

const app = express();
const PORT = 3000;

app.use(express.json());

<<<<<<< HEAD
AppDataSource.initialize()
  .then(() => console.log("Conexión MySQL establecida"))
  .catch(err => console.error("Error DB:", err));

app.use("/huespedes", huespedRoutes);
app.use("/habitaciones", habitacionRoutes);

app.get("/", (req, res) => res.send("API Hotel PA dinámica funcionando 🚀"));
=======
app.use("/huespedes", huespedRoutes);
app.use("/habitaciones", habitacionRoutes);
app.use("/reservas", reservaRoutes);
app.use("/paquetes", paqueteRoutes);

app.get("/", (req, res) => res.send("API Hotel PA dinámica "));
>>>>>>> 9f5b2dc21898783bfc444d8a8fc09007c6b354ad

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));