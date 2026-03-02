import { ReservaHotel } from "../models/ReservaHotel";
import { EstadoReserva } from "../models/enums/EstadoReserva";
import { IReservaRepository } from "../repositories/interfaces/IReservaRepository";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";
import { IHuespedRepository } from "../repositories/interfaces/IHuespedRepository";

export type ReservaCreateDTO = {
  huespedId: number;
  habitacionId: number;
  fechaInicio: Date;
  fechaFin: Date;
};

export class ReservaService {
  constructor(
    private readonly reservaRepo: IReservaRepository,
    private readonly habitacionRepo: IHabitacionRepository,
    private readonly huespedRepo: IHuespedRepository
  ) {}

  crear(data: ReservaCreateDTO): ReservaHotel {
    const huesped = this.huespedRepo.findById(data.huespedId);
    if (!huesped) throw new Error("Huésped no existe");

    const habitacion = this.habitacionRepo.findById(data.habitacionId);
    if (!habitacion) throw new Error("Habitación no existe");

    const all = this.reservaRepo.findAll();
    const newId = all.length > 0 ? Math.max(...all.map(r => r.id)) + 1 : 1;

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

    const updated: ReservaHotel = { ...r, estado: EstadoReserva.CONFIRMADA };
    return this.reservaRepo.update(updated);
  }

  cancelar(id: number): ReservaHotel {
    const r = this.reservaRepo.findById(id);
    if (!r) throw new Error("Reserva no encontrada");

    const updated: ReservaHotel = { ...r, estado: EstadoReserva.CANCELADA };
    return this.reservaRepo.update(updated);
  }
}