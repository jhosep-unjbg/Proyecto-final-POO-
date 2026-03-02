import { HotelSystem } from "./HotelSystem";

import { HuespedServiceMemory } from "./services/memory/HuespedServiceMemory";
import { HabitacionServiceMemory } from "./services/memory/HabitacionServiceMemory";
import { ReservaServiceMemory } from "./services/memory/ReservaServiceMemory";
import { EstadiaServiceMemory } from "./services/memory/EstadiaServiceMemory";
import { PagoServiceMemory } from "./services/memory/PagoServiceMemory";
import { TarifaServiceMemory } from "./services/memory/TarifaServiceMemory";

import { TipoHabitacion } from "./models/enums/TipoHabitacion";
import { MetodoPago } from "./models/enums/MetodoPago";

const hotel = new HotelSystem(
  new HuespedServiceMemory(),
  new HabitacionServiceMemory(),
  new ReservaServiceMemory(),
  new EstadiaServiceMemory(),
  new PagoServiceMemory(),
  new TarifaServiceMemory()
);

// 1) Crear huésped
const h1 = hotel.registrarHuesped({
  nombres: "Juan",
  apellidos: "Pérez",
  dni: "76543210",
  telefono: "999888777",
  email: "juan@mail.com",
});

// 2) Crear habitación
const hab1 = hotel.registrarHabitacion({
  numero: "101",
  piso: 1,
  tipo: TipoHabitacion.SIMPLE,
  capacidad: 1,
  activa: true,
});

// 3) Crear tarifa vigente
hotel["tarifaService"].crearOActualizar({ 
  tipoHabitacion: TipoHabitacion.SIMPLE,
  precioPorNoche: 120,
  moneda: "PEN",
 });

// 4) Crear reserva
const r1 = hotel.crearReserva({
  huespedId: h1.id,
  habitacionId: hab1.id,
  fechaInicio: new Date("2026-03-05"),
  fechaFin: new Date("2026-03-07"),
  observaciones: "Cerca al ascensor",
});

// 5) Confirmar
hotel.confirmarReserva(r1.id);

// 6) Check-in
const e1 = hotel.hacerCheckIn(r1.id, new Date("2026-03-05T15:00:00"));

// 7) Pago
const p1 = hotel.registrarPago({
  reservaId: r1.id,
  monto: 240,
  metodo: MetodoPago.TARJETA,
  referencia: "VISA-123",
});

console.log("Huésped:", h1);
console.log("Habitación:", hab1);
console.log("Reserva:", hotel["reservaService"].obtenerPorId(r1.id));
console.log("Estadía:", e1);
console.log("Pago:", p1);
console.log("Buscar huésped por dni:", hotel.buscarHuesped({ dni: "7654" }));