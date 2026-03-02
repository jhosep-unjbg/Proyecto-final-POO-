import { Pago } from "../../models/Pago";
import { IPagoService } from "../repositories/interfaces//PagoService";
import { nextId } from "./_utils";

export class PagoServiceMemory implements IPagoService {
  private readonly data: Pago[] = [];
  private readonly idCounter = { value: 0 };

  crear(dto: Omit<Pago, "id">): Pago {
    if (!dto.reservaId) throw new Error("reservaId es requerido");
    if (dto.monto <= 0) throw new Error("monto debe ser > 0");
    if (!dto.metodo) throw new Error("metodo es requerido");

    const entity = new Pago(
      nextId(this.idCounter),
      dto.reservaId,
      dto.monto,
      dto.metodo,
      dto.fecha ?? new Date(),
      dto.moneda ?? "PEN",
      dto.referencia
    );

    this.data.push(entity);
    return entity;
  }

  obtenerPorId(id: number): Pago | null {
    return this.data.find(p => p.id === id) ?? null;
  }

  listarPorReserva(reservaId: number): Pago[] {
    return this.data.filter(p => p.reservaId === reservaId);
  }
}