import { Huesped } from "./models/Huesped";
import { Habitacion } from "./models/Habitacion";
import { ReservaHotel } from "./models/ReservaHotel";
import { Pago } from "./models/Pago";

import { EstadoHabitacion } from "./models/enums/EstadoHabitacion";

import { HuespedService, HuespedCreateInput, HuespedSearchFilter } from "./services/HuespedService";
import { HabitacionService } from "./services/HabitacionService";
import { ReservaService, ReservaCreateDTO } from "./services/ReservaService";
import { PagoService } from "./services/PagoService";

export type HabitacionCreateDTO = {
  numero: string;
  piso: number;
  tipoHabitacionId: number;
  precioPorNoche: number;
};

export type HabitacionUpdateDTO = Partial<{
  numero: string;
  piso: number;
  tipoHabitacionId: number;
  precioPorNoche: number;
  estado: EstadoHabitacion;
}>;

export type PagoCreateDTO = {
  reservaId: number;
  monto: number;
  moneda: string;
  metodo: string;
  referencia?: string;
  fecha: Date;
};

export class HotelSystem {
  constructor(
    private readonly huespedService: HuespedService,
    private readonly habitacionService: HabitacionService,
    private readonly reservaService: ReservaService,
    private readonly pagoService?: PagoService
  ) {}

  // =========================
  // HUÉSPED
  // =========================
  crearHuesped(input: HuespedCreateInput): Huesped {
    return this.huespedService.crear(input);
  }

  buscarHuesped(filtro: HuespedSearchFilter): Huesped[] {
    return this.huespedService.buscar(filtro);
  }

  // =========================
  // HABITACIÓN
  // =========================
  crearHabitacion(dto: HabitacionCreateDTO): Habitacion {
    return this.habitacionService.crear(dto);
  }

  listarHabitaciones(): Habitacion[] {
    return this.habitacionService.listar();
  }

  obtenerHabitacionPorId(id: number): Habitacion | null {
    return this.habitacionService.obtenerPorId(id);
  }

  actualizarHabitacion(id: number, dto: HabitacionUpdateDTO): Habitacion {
    return this.habitacionService.actualizar(id, dto);
  }

  cambiarEstadoHabitacion(id: number, estado: EstadoHabitacion): Habitacion {
    return this.habitacionService.cambiarEstado(id, estado);
  }

  eliminarHabitacion(id: number): boolean {
    return this.habitacionService.eliminar(id);
  }

  // =========================
  // RESERVA
  // =========================
  crearReserva(dto: ReservaCreateDTO): ReservaHotel {
    return this.reservaService.crear(dto);
  }

  confirmarReserva(id: number): ReservaHotel {
    return this.reservaService.confirmar(id);
  }

  cancelarReserva(id: number): ReservaHotel {
    return this.reservaService.cancelar(id);
  }

  // =========================
  // PAGO (opcional)
  // =========================
  registrarPago(dto: PagoCreateDTO): Pago {
    if (!this.pagoService) throw new Error("PagoService no está configurado");
    return this.pagoService.crear(dto as any);
  }
}