import { JsonRepository } from "./JsonRepository";
import { Habitacion } from "../../models/Habitacion";
import { IHabitacionRepository } from "../interfaces/IHabitacionRepository";

export class FileHabitacionRepository
  extends JsonRepository<Habitacion>
  implements IHabitacionRepository
{
  constructor() {
    super("habitaciones.json");
  }

  // Si tu interfaz exige save, lo hacemos alias a create:
  save(entity: Habitacion): Habitacion {
    return this.create(entity);
  }
}