import { Habitacion } from "../models/Habitacion";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";

export class HabitacionService {
  constructor(protected readonly repo: IHabitacionRepository) {}

  crear(data: Omit<Habitacion, "id">): Habitacion {
    if (!data.numero) throw new Error("Numero requerido");
    if (!data.tipo) throw new Error("Tipo requerido");

    return this.repo.create(data);
  }

  listar(): Habitacion[] {
    return this.repo.findAll();
  }
}