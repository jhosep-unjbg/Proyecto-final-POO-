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
}