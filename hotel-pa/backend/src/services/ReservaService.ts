import { ReservaHotel } from "../models/ReservaHotel";
import { EstadoReserva } from "../models/EstadoReserva";
import { IReservaRepository } from "../repositories/interfaces/IReservaRepository";

export class ReservaService {
  constructor(private readonly repo: IReservaRepository) {}

  crear(data: {
    huespedId: number;
    habitacionId: number;
    fechaInicio: Date;
    fechaFin: Date;
    observaciones?: string;
  }): ReservaHotel {
    if (data.fechaFin <= data.fechaInicio) {
      throw new Error("fechaFin debe ser mayor");
    }

    const reserva = new ReservaHotel(
      0,
      data.huespedId,
      data.habitacionId,
      data.fechaInicio,
      data.fechaFin,
      EstadoReserva.PENDIENTE,
      undefined,
      data.observaciones
    );

    return this.repo.create(reserva);
  }

  confirmar(id: number): ReservaHotel {
    const reserva = this.repo.findById(id);
    if (!reserva) throw new Error("Reserva no encontrada");

    reserva.confirmar();
    return this.repo.update(reserva);
  }

  cancelar(id: number): ReservaHotel {
    const reserva = this.repo.findById(id);
    if (!reserva) throw new Error("Reserva no encontrada");

    reserva.cancelar();
    return this.repo.update(reserva);
  }

  obtenerPorId(id: number) {
    return this.repo.findById(id);
  }
}