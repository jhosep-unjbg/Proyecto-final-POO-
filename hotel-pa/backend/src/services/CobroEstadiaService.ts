import { FileEstadiaRepository } from "../repositories/file/FileEstadiaRepository";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";
import { FileReservaRepository } from "../repositories/file/FileReservaRepository";

export interface ResumenCobroEstadia {
  estadiaId: number;
  reservaId: number;
  habitacionId: number;
  precioPorNoche: number;
  noches: number;
  total: number;
}

export class CobroEstadiaService {
  constructor(
    private readonly estadiaRepo: FileEstadiaRepository,
    private readonly reservaRepo: FileReservaRepository,
    private readonly habitacionRepo: FileHabitacionRepository
  ) {}

  calcularTotal(estadiaId: number): ResumenCobroEstadia {
    const estadia = this.estadiaRepo.findById(estadiaId);
    if (!estadia) throw new Error("Estadía no encontrada");

    const reserva = this.reservaRepo.findById(estadia.reservaId);
    if (!reserva) throw new Error("Reserva no encontrada");

    const habitacion = this.habitacionRepo.findById(reserva.habitacionId);
    if (!habitacion) throw new Error("Habitación no encontrada");

    const fechaInicio = new Date(estadia.fechaCheckIn);
    const fechaFin = estadia.fechaCheckOut ? new Date(estadia.fechaCheckOut) : new Date();
    const milisPorDia = 1000 * 60 * 60 * 24;
    const diferencia = fechaFin.getTime() - fechaInicio.getTime();
    const noches = Math.max(1, Math.ceil(diferencia / milisPorDia));

    const precioPorNoche = Number(habitacion.precioPorNoche);
    const total = Number((noches * precioPorNoche).toFixed(2));

    return {
      estadiaId: estadia.id,
      reservaId: reserva.id,
      habitacionId: habitacion.id,
      precioPorNoche,
      noches,
      total,
    };
  }
}
