import express from "express";

import habitacionRoutes from "../routes/habitacion.routes";
import huespedRoutes from "../routes/huesped.routes";
import reservaRoutes from "../routes/reserva.routes";
import paqueteRoutes from "../routes/paquete.routes";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});


app.use("/habitaciones", habitacionRoutes);
app.use("/huespedes", huespedRoutes);
app.use("/reservas", reservaRoutes);
app.use("/paquetes", paqueteRoutes);

export default app;