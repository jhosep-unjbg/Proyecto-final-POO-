import { HuespedService } from "./services/HuespedService";
import { HabitacionService } from "./services/HabitacionService";
import { ReservaService } from "./services/ReservaService";
import { EstadiaService } from "./services/EstadiaService";
import { PagoService } from "./services/PagoService";
import { TarifaService } from "./services/TarifaService";

import { Huesped } from "./models/Huesped";
import { Habitacion } from "./models/Habitacion";
import { ReservaHotel } from "./models/ReservaHotel";
import { Estadia } from "./models/Estadia";
import { Pago } from "./models/Pago";
import { TarifaHotel } from "./models/TarifaHotel";
import { TipoHabitacion } from "./models/enums/TipoHabitacion";

export class HotelSystem {
  constructor(
    private readonly huespedService: HuespedService,
    private readonly habitacionService: HabitacionService,
    private readonly reservaService: ReservaService,
    private readonly estadiaService: EstadiaService,
    private readonly pagoService: PagoService,
    private readonly tarifaService: TarifaService
  ) {}

  // ===== HUÉSPED =====
  registrarHuesped(data: {
    nombres: string;
    apellidos: string;
    dni: string;
    telefono: string;
    email?: string;
  }): Huesped {
    return this.huespedService.crear(data);
  }

  buscarHuesped(filtro: {
    nombres?: string;
    apellidos?: string;
    dni?: string;
    telefono?: string;
  }): Huesped[] {
    return this.huespedService.buscar(filtro);
  }

  // ===== HABITACIÓN =====
  registrarHabitacion(data: Omit<Habitacion, "id">): Habitacion {
    return this.habitacionService.crear(data);
  }

  listarHabitaciones(): Habitacion[] {
    return this.habitacionService.listar();
  }

  // ===== TARIFAS =====
  crearTarifa(data: Omit<TarifaHotel, "id">): TarifaHotel {
    return this.tarifaService.crear(data);
  }

  obtenerTarifaPorTipo(tipo: TipoHabitacion): TarifaHotel | null {
    return this.tarifaService.obtenerPorTipo(tipo);
  }

  listarTarifas(): TarifaHotel[] {
    return this.tarifaService.listar();
  }

  // ===== RESERVA =====
  crearReserva(data: {
    huespedId: number;
    habitacionId: number;
    fechaInicio: Date;
    fechaFin: Date;
    observaciones?: string;
  }): ReservaHotel {
    return this.reservaService.crear(data);
  }

  confirmarReserva(id: number): ReservaHotel {
    return this.reservaService.confirmar(id);
  }

  cancelarReserva(id: number): ReservaHotel {
    return this.reservaService.cancelar(id);
  }

  obtenerReservaPorId(id: number): ReservaHotel | null {
    return this.reservaService.obtenerPorId(id);
  }

  // ===== ESTADÍA =====
  checkIn(reservaId: number): Estadia {
    return this.estadiaService.checkIn(reservaId);
  }

  checkOut(estadiaId: number): Estadia {
    return this.estadiaService.checkOut(estadiaId);
  }

  // ===== PAGO =====
  registrarPago(data: Omit<Pago, "id">): Pago {
    return this.pagoService.crear(data);
  }

  listarPagosPorReserva(reservaId: number): Pago[] {
    return this.pagoService.listarPorReserva(reservaId);
  }
}