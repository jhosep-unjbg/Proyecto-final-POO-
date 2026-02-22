import express from "express";
import huespedRoutes from "./routes/huesped.routes";
import habitacionRoutes from "./routes/habitacion.routes";
import reservaRoutes from "./routes/reserva.routes";
import paqueteRoutes from "./routes/paquete.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/huespedes", huespedRoutes);
app.use("/habitaciones", habitacionRoutes);
app.use("/reservas", reservaRoutes);
app.use("/paquetes", paqueteRoutes);

app.get("/", (req, res) => res.send("API Hotel PA dinámica "));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));