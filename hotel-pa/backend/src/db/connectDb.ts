import { AppDataSource } from "./data-source";

export async function connectDbIfEnabled(): Promise<void> {
  const enabled = (process.env.DB_ENABLED ?? "false") === "true";

  if (!enabled) {
    console.log("DB deshabilitada (DB_ENABLED=false). Usando TXT por ahora.");
    return;
  }

  try {
    await AppDataSource.initialize();
    console.log("DB conectada con TypeORM");
  } catch (err) {
    console.error(" Error conectando DB:", err);
    console.log("Continuando sin DB (modo TXT).");
  }
}