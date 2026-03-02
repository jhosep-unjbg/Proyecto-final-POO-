"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HotelSystem_1 = require("./HotelSystem");
var HuespedServiceMemory_1 = require("./services/memory/HuespedServiceMemory");
var HabitacionServiceMemory_1 = require("./services/memory/HabitacionServiceMemory");
var ReservaServiceMemory_1 = require("./services/memory/ReservaServiceMemory");
var EstadiaServiceMemory_1 = require("./services/memory/EstadiaServiceMemory");
var PagoServiceMemory_1 = require("./services/memory/PagoServiceMemory");
var TarifaServiceMemory_1 = require("./services/memory/TarifaServiceMemory");
var TipoHabitacion_1 = require("./models/enums/TipoHabitacion");
var MetodoPago_1 = require("./models/enums/MetodoPago");
var hotel = new HotelSystem_1.HotelSystem(new HuespedServiceMemory_1.HuespedServiceMemory(), new HabitacionServiceMemory_1.HabitacionServiceMemory(), new ReservaServiceMemory_1.ReservaServiceMemory(), new EstadiaServiceMemory_1.EstadiaServiceMemory(), new PagoServiceMemory_1.PagoServiceMemory(), new TarifaServiceMemory_1.TarifaServiceMemory());
// 1) Crear huésped
var h1 = hotel.registrarHuesped({
    nombres: "Juan",
    apellidos: "Pérez",
    dni: "76543210",
    telefono: "999888777",
    email: "juan@mail.com",
});
// 2) Crear habitación
var hab1 = hotel.registrarHabitacion({
    numero: "101",
    piso: 1,
    tipo: TipoHabitacion_1.TipoHabitacion.SIMPLE,
    capacidad: 1,
    activa: true,
});
// 3) Crear tarifa vigente
hotel["tarifaService"].crearOActualizar({
    tipoHabitacion: TipoHabitacion_1.TipoHabitacion.SIMPLE,
    precioPorNoche: 120,
    moneda: "PEN",
});
// 4) Crear reserva
var r1 = hotel.crearReserva({
    huespedId: h1.id,
    habitacionId: hab1.id,
    fechaInicio: new Date("2026-03-05"),
    fechaFin: new Date("2026-03-07"),
    observaciones: "Cerca al ascensor",
});
// 5) Confirmar
hotel.confirmarReserva(r1.id);
// 6) Check-in
var e1 = hotel.hacerCheckIn(r1.id, new Date("2026-03-05T15:00:00"));
// 7) Pago
var p1 = hotel.registrarPago({
    reservaId: r1.id,
    monto: 240,
    metodo: MetodoPago_1.MetodoPago.TARJETA,
    referencia: "VISA-123",
});
console.log("Huésped:", h1);
console.log("Habitación:", hab1);
console.log("Reserva:", hotel["reservaService"].obtenerPorId(r1.id));
console.log("Estadía:", e1);
console.log("Pago:", p1);
console.log("Buscar huésped por dni:", hotel.buscarHuesped({ dni: "7654" }));
