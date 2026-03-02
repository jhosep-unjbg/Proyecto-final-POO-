import { ReservaHotel } from "../../models/ReservaHotel";
import { EstadoReserva } from "../../models/EstadoReserva";
import { IReservaService } from "../contracts/ReservaService";
import { nextId } from "./_utils";

export class ReservaServiceMemory implements IReservaService {
  private readonly data: ReservaHotel[] = [];
  private readonly idCounter = { value: 0 };

  crear(dto: Omit<ReservaHotel, "id" | "estado"> & Partial<Pick<ReservaHotel, "estado">>): ReservaHotel {
    if (!dto.huespedId) throw new Error("huespedId es requerido");
    if (!dto.habitacionId) throw new Error("habitacionId es requerido");
    if (!dto.fechaInicio || !dto.fechaFin) throw new Error("fechaInicio y fechaFin son requeridas");
    if (dto.fechaFin <= dto.fechaInicio) throw new Error("fechaFin debe ser mayor que fechaInicio");

    const entity = new ReservaHotel(
      nextId(this.idCounter),
      dto.huespedId,
      dto.habitacionId,
      dto.fechaInicio,
      dto.fechaFin,
      dto.estado ?? EstadoReserva.PENDIENTE,
      dto.paqueteTuristicoId,
      dto.observaciones
    );

    this.data.push(entity);
    return entity;
  }

  obtenerPorId(id: number): ReservaHotel | null {
    return this.data.find(r => r.id === id) ?? null;
  }

  listar(): ReservaHotel[] {
    return [...this.data];
  }

  confirmar(id: number): ReservaHotel {
    const r = this.obtenerPorId(id);
    if (!r) throw new Error("Reserva no encontrada.");
    r.confirmar();
    return r;
  }

  cancelar(id: number, _motivo?: string): ReservaHotel {
    const r = this.obtenerPorId(id);
    if (!r) throw new Error("Reserva no encontrada.");
    r.cancelar();
    return r;
  }
}