import { FileDb } from "./repositories/file/FileDb";

const db = new FileDb();
const hotel = db.hotelSystem;

const huesped = hotel.registrarHuesped({
  nombres: "Juan",
  apellidos: "Perez",
  dni: "12345678",
  telefono: "999888777",
  email: "juan@mail.com",
});

console.log("✅ Huésped creado:", huesped);