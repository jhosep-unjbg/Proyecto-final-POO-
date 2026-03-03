import { buildHotelSystem } from "./services/buildHotelSystem";

const hotel = buildHotelSystem();

console.log("Habitaciones:", hotel.listarHabitaciones());