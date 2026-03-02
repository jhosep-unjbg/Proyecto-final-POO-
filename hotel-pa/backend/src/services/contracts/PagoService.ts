import { Pago } from "../../models/Pago";
import { IPagoRepository } from "../../repositories/interfaces/IPagoRepository";

export class PagoService {
  constructor(private readonly repo: IPagoRepository) {}

  crear(data: Omit<Pago, "id">): Pago {
    // validaciones mínimas (ajusta a tu modelo Pago)
    if ((data as any).monto == null) throw new Error("Monto requerido");
    if ((data as any).reservaId == null) throw new Error("Reserva requerida");

    return this.repo.create(data);
  }

  obtenerPorId(id: number): Pago | null {
    return this.repo.findById(id);
  }

  listarPorReserva(reservaId: number): Pago[] {
    return this.repo.findByReserva(reservaId);
  }
}