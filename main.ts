import { TipoHabitacion } from "./models/TipoHabitacion";
import { Habitacion } from "./models/Habitacion";
import { Huesped } from "./models/Huesped";
import { ReservaHotel } from "./models/ReservasHotel";

const tipoSimple = new TipoHabitacion(1, "Simple", 2, "Habitación básica");
const habitacion101 = new Habitacion(101, tipoSimple);

const huesped1 = new Huesped(1, "Carlos Pérez", "12345678", "999888777");

const reserva = new ReservaHotel(
    1,
    huesped1,
    habitacion101,
    new Date("2026-06-01"),
    new Date("2026-06-05")
);

reserva.confirmar();

console.log("Estado reserva:", reserva.getEstado());
