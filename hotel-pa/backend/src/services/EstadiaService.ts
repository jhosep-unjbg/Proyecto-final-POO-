import { Estadia } from "../models/Estadia";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";
import { EstadoReserva } from "../models/enums/EstadoReserva";
import { FileEstadiaRepository } from "../repositories/file/FileEstadiaRepository";
import { IReservaRepository } from "../repositories/interfaces/IReservaRepository";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";

export class EstadiaService {
  constructor(
    private readonly estadiaRepo: FileEstadiaRepository,
    private readonly reservaRepo: IReservaRepository,
    private readonly habitacionRepo: IHabitacionRepository
  ) {}

  checkIn(reservaId: number, fecha: Date = new Date()): Estadia {
    const reserva = this.reservaRepo.findById(reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");
    if (reserva.estado !== EstadoReserva.CONFIRMADA) {
      throw new Error("Solo se puede hacer check-in a una reserva CONFIRMADA");
    }

    const hab = this.habitacionRepo.findById(reserva.habitacionId);
    if (!hab) throw new Error("Habitación no encontrada");
    if ((hab as any).estado !== EstadoHabitacion.DISPONIBLE) {
      throw new Error("La habitación no está DISPONIBLE");
    }

    const all = this.estadiaRepo.findAll();
    const newId = all.length > 0 ? Math.max(...all.map(e => e.id)) + 1 : 1;

    const estadia = new Estadia(newId, reservaId, fecha, null);

    // cambiar habitación a OCUPADA
    this.habitacionRepo.update({ ...(hab as any), estado: EstadoHabitacion.OCUPADA });

    return this.estadiaRepo.create(estadia);
  }

  checkOut(estadiaId: number, fecha: Date = new Date()): Estadia {
    const e = this.estadiaRepo.findById(estadiaId);
    if (!e) throw new Error("Estadía no encontrada");
    if (e.fechaCheckOut) throw new Error("La estadía ya tiene check-out");

    const reserva = this.reservaRepo.findById(e.reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");

    const hab = this.habitacionRepo.findById(reserva.habitacionId);
    if (!hab) throw new Error("Habitación no encontrada");

    const updated = { ...e, fechaCheckOut: fecha };

    // liberar habitación
    this.habitacionRepo.update({ ...(hab as any), estado: EstadoHabitacion.DISPONIBLE });

    return this.estadiaRepo.update(updated);
  }
}