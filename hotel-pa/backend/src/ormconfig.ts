import { DataSource } from "typeorm";
import { Huesped } from "./models/Huesped";
import { Habitacion } from "./models/Habitacion";
import { TipoHabitacion } from "./models/Tipohabitacion";
import { ReservaHotel } from "./models/ReservaHotel";
import { PaqueteTuristico } from "./models/PaqueteTuristico";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "tu_password",
  database: "hotel_pa",
  synchronize: true, // sincroniza tablas automáticamente (solo dev)
  logging: false,
  entities: [Huesped, Habitacion, TipoHabitacion, ReservaHotel, PaqueteTuristico],
  migrations: [],
  subscribers: [],
});