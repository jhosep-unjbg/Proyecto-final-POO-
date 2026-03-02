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
  delete(id: number): boolean {
  const items = this.findAll();
  const idx = items.findIndex((x: any) => x.id === id);
  if (idx === -1) return false;

  items.splice(idx, 1);
  
  return true;
}
}