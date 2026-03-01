import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? "root",
  password: process.env.DB_PASS ?? "",
  database: process.env.DB_NAME ?? "hotel_pa",
  synchronize: true, // desarrollo (luego se cambia a migrations)
  logging: false,
  entities: [], // luego pondrás tus entidades TypeORM aquí
});