import { JsonRepository } from "./JsonRepository";
import { Habitacion } from "../../models/Habitacion";
import { IHabitacionRepository } from "../interfaces/IHabitacionRepository";

export class FileHabitacionRepository
  extends JsonRepository<Habitacion>
  implements IHabitacionRepository
{
  save(nueva: Habitacion) {
    throw new Error("Method not implemented.");
  }
  constructor() {
    super("habitaciones.json");
  }
}