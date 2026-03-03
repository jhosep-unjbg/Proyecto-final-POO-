export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DB_ENABLED: (process.env.DB_ENABLED ?? "false") === "true",
  STORAGE: process.env.STORAGE ?? "FILE",
};