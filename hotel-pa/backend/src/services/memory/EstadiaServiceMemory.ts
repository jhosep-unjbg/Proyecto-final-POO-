import { Estadia } from "../../models/Estadia";
import { IEstadiaService } from "../contracts/EstadiaService";
import { nextId } from "./_utils";

export class EstadiaServiceMemory implements IEstadiaService {
  private readonly data: Estadia[] = [];
  private readonly idCounter = { value: 0 };

  crearDesdeReserva(reservaId: number, checkIn: Date): Estadia {
    // Regla: 1 estadía activa por reserva
    const existeActiva = this.data.some(e => e.reservaId === reservaId && e.estado === "ACTIVA");
    if (existeActiva) throw new Error("Ya existe una estadía activa para esa reserva.");

    const entity = new Estadia(nextId(this.idCounter), reservaId, checkIn);
    this.data.push(entity);
    return entity;
  }

  obtenerPorId(id: number): Estadia | null {
    return this.data.find(e => e.id === id) ?? null;
  }

  listar(): Estadia[] {
    return [...this.data];
  }

  finalizar(id: number, checkOut: Date): Estadia {
    const e = this.obtenerPorId(id);
    if (!e) throw new Error("Estadía no encontrada.");
    e.finalizar(checkOut);
    return e;
  }
}