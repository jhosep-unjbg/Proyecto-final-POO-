import { JsonRepository } from "./JsonRepository";
import { Pago } from "../../models/Pago";
import { IPagoRepository } from "../interfaces/IPagoRepository";

export class FilePagoRepository
  extends JsonRepository<Pago>
  implements IPagoRepository
{
  constructor() {
    super("pagos.json");
  }

  findByReserva(reservaId: number): Pago[] {
    const items = this.findAll();
    return items.filter(p => (p as any).reservaId === reservaId);
  }
}