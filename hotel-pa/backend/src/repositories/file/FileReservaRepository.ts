import { JsonRepository } from "./JsonRepository";
import { ReservaHotel } from "../../models/ReservaHotel";
import { IReservaRepository } from "../interfaces/IReservaRepository";

export class FileReservaRepository
  extends JsonRepository<ReservaHotel>
  implements IReservaRepository
{
  constructor() {
    super("reservas.json");
  }

  // Métodos extra (opcionales, útiles)
  findByHuesped(huespedId: number): ReservaHotel[] {
    const items = this.findAll();
    return items.filter(r => (r as any).huespedId === huespedId);
  }

  findByHabitacion(habitacionId: number): ReservaHotel[] {
    const items = this.findAll();
    return items.filter(r => (r as any).habitacionId === habitacionId);
  }
}