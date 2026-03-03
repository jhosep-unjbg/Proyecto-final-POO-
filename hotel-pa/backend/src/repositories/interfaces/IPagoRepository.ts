import { Pago } from "../../models/Pago";

export interface IPagoRepository {
  findAll(): Pago[];
  findById(id: number): Pago | null;

  create(data: Omit<Pago, "id">): Pago;
  update(entity: Pago): Pago;
  delete(id: number): void;

  findByReserva(reservaId: number): Pago[];
}