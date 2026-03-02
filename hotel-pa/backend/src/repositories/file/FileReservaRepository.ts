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

  private hydrate(r: ReservaHotel): ReservaHotel {
    return {
      ...r,
      fechaInicio: new Date((r as any).fechaInicio),
      fechaFin: new Date((r as any).fechaFin),
    };
  }

  override findAll(): ReservaHotel[] {
    return super.findAll().map(r => this.hydrate(r));
  }

  override findById(id: number): ReservaHotel | null {
    const r = super.findById(id);
    return r ? this.hydrate(r) : null;
  }

  findByHuesped(huespedId: number): ReservaHotel[] {
    return this.findAll().filter(r => r.huespedId === huespedId);
  }

  findByHabitacion(habitacionId: number): ReservaHotel[] {
    return this.findAll().filter(r => r.habitacionId === habitacionId);
  }
}