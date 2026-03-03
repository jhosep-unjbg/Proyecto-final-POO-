import { ReservaHotel } from "../models/ReservaHotel";
import { EstadoReserva } from "../models/enums/EstadoReserva";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";
import { IReservaRepository } from "../repositories/interfaces/IReservaRepository";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";
import { IHuespedRepository } from "../repositories/interfaces/IHuespedRepository";

export type ReservaCreateDTO = {
  huespedId: number;
  habitacionId: number;
  fechaInicio: Date;
  fechaFin: Date;
};

function isValidDate(d: any): d is Date {
  return d instanceof Date && !isNaN(d.getTime());
}

// overlap si los rangos se cruzan (aInicio < bFin && bInicio < aFin)
function overlaps(aInicio: Date, aFin: Date, bInicio: Date, bFin: Date): boolean {
  return aInicio < bFin && bInicio < aFin;
}

export class ReservaService {
  constructor(
    private readonly reservaRepo: IReservaRepository,
    private readonly habitacionRepo: IHabitacionRepository,
    private readonly huespedRepo: IHuespedRepository
  ) {}

  crear(data: ReservaCreateDTO): ReservaHotel {
    // 1) validar fechas
    if (!isValidDate(data.fechaInicio)) throw new Error("fechaInicio inválida");
    if (!isValidDate(data.fechaFin)) throw new Error("fechaFin inválida");
    if (data.fechaInicio >= data.fechaFin) throw new Error("fechaInicio debe ser menor que fechaFin");

    // 2) validar huésped
    const huesped = this.huespedRepo.findById(data.huespedId);
    if (!huesped) throw new Error("Huésped no existe");

    // 3) validar habitación
    const habitacion = this.habitacionRepo.findById(data.habitacionId);
    if (!habitacion) throw new Error("Habitación no existe");

    // 4) validar estado habitación (solo se reserva si está DISPONIBLE)
    // Si tu propiedad no se llama "estado", cámbiala aquí.
    if ((habitacion as any).estado !== EstadoHabitacion.DISPONIBLE) {
      throw new Error("Habitación no disponible para reservar");
    }

    // 5) evitar choque con reservas CONFIRMADAS en el mismo rango
    const reservasHabConfirmadas = this.reservaRepo
      .findAll()
      .filter(
        r =>
          r.habitacionId === data.habitacionId &&
          r.estado === EstadoReserva.CONFIRMADA
      );

    const choca = reservasHabConfirmadas.some(r =>
      overlaps(data.fechaInicio, data.fechaFin, r.fechaInicio, r.fechaFin)
    );

    if (choca) throw new Error("Ya existe una reserva confirmada en esas fechas");

    // 6) crear id
    const all = this.reservaRepo.findAll();
    const newId = all.length > 0 ? Math.max(...all.map(r => r.id)) + 1 : 1;

    // 7) crear reserva
    const reserva = new ReservaHotel(
      newId,
      data.huespedId,
      data.habitacionId,
      data.fechaInicio,
      data.fechaFin,
      EstadoReserva.PENDIENTE
    );

    return this.reservaRepo.create(reserva);
  }

  confirmar(id: number): ReservaHotel {
    const r = this.reservaRepo.findById(id);
    if (!r) throw new Error("Reserva no encontrada");

    // Podrías agregar regla: solo PENDIENTE se confirma
    if (r.estado !== EstadoReserva.PENDIENTE) {
      throw new Error("Solo reservas PENDIENTE pueden confirmarse");
    }

    const updated: ReservaHotel = { ...r, estado: EstadoReserva.CONFIRMADA };
    return this.reservaRepo.update(updated);
  }

  cancelar(id: number): ReservaHotel {
    const r = this.reservaRepo.findById(id);
    if (!r) throw new Error("Reserva no encontrada");

    // Podrías agregar regla: no cancelar si ya está cancelada
    if (r.estado === EstadoReserva.CANCELADA) {
      throw new Error("La reserva ya está cancelada");
    }

    const updated: ReservaHotel = { ...r, estado: EstadoReserva.CANCELADA };
    return this.reservaRepo.update(updated);
  }
}