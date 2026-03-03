import { Factura } from "../../models/Factura";

export interface IFacturaRepository {
  create(data: Omit<Factura, "id">): Factura;
  findByReserva(reservaId: number): Factura[];
  findById(id: number): Factura | null;
}