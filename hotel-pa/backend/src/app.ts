import express from "express";
import dotenv from "dotenv";
import { testDBConnection } from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Hotel API running" });
});

// (Luego) app.use("/huesped", huespedRoutes) ...
// (Luego) app.use("/reserva", reservaRoutes) ...

const PORT = Number(process.env.PORT || 3000);

async function main() {
  await testDBConnection();
  app.listen(PORT, () => {
    console.log(`API escuchando en http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error(" Error al iniciar la app:", err);
  process.exit(1);
});

export default app;