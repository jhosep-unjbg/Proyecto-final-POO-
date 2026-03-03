import express from "express";
import path from "path";
import estadiaRoutes from "./routes/estadia.routes";

import habitacionRoutes from "./routes/habitacion.routes";
import huespedRoutes from "./routes/huesped.routes";
import reservaRoutes from "./routes/reserva.routes";
import paqueteRoutes from "./routes/paquete.routes";
import facturaRoutes from "./routes/factura.routes";
import recepcionistaRoutes from "./routes/recepcionista.routes";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-rol, x-admin-usuario");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use(express.static(path.join(process.cwd(), "../frontend")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../frontend", "index.html"));
});

app.use("/estadias", estadiaRoutes);
app.use("/habitaciones", habitacionRoutes);
app.use("/huespedes", huespedRoutes);
app.use("/reservas", reservaRoutes);
app.use("/paquetes", paqueteRoutes);
app.use("/facturas", facturaRoutes);
app.use("/recepcionistas", recepcionistaRoutes);

export default app;