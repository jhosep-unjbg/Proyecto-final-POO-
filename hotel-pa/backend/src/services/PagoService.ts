import { Pago } from "../models/Pago";
import { IPagoRepository } from "../repositories/interfaces/IPagoRepository";

export class PagoService {
  constructor(private readonly repo: IPagoRepository) {}

  crear(data: Omit<Pago, "id">): Pago {
    if (data.monto <= 0) throw new Error("Monto invalido");

    return this.repo.create(data);
  }

  listarPorReserva(reservaId: number) {
    return this.repo.findByReserva(reservaId);
  }
}