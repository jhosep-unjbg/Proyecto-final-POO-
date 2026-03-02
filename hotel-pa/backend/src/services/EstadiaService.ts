import { Estadia } from "../models/Estadia";
import { IEstadiaRepository } from "../repositories/interfaces/IEstadiaRepository";

export class EstadiaService {
  constructor(private readonly repo: IEstadiaRepository) {}

  checkIn(reservaId: number): Estadia {
    const estadia = new Estadia(0, reservaId, new Date());
    return this.repo.create(estadia);
  }

  checkOut(id: number): Estadia {
    const estadia = this.repo.findById(id);
    if (!estadia) throw new Error("Estadia no encontrada");

    estadia.finalizar(new Date());
    return this.repo.update(estadia);
  }
}