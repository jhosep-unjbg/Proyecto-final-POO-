import { JsonRepository } from "./JsonRepository";
import { Estadia } from "../../models/Estadia";
import { IEstadiaRepository } from "../interfaces/IEstadiaRepository";

export class FileEstadiaRepository
  extends JsonRepository<Estadia>
  implements IEstadiaRepository
{
  constructor() {
    super("estadias.json");
  }

  findByReserva(reservaId: number): Estadia | null {
    const items = this.findAll();
    return items.find(e => e.reservaId === reservaId) ?? null;
  }
}