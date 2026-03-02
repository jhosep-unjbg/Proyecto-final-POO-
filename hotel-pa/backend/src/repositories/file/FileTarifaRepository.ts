import { JsonRepository } from "./JsonRepository";
import { TarifaHotel } from "../../models/TarifaHotel";
import { TipoHabitacion } from "../../models/TipoHabitacion";
import { ITarifaRepository } from "../interfaces/ITarifaRepository";

export class FileTarifaRepository
  extends JsonRepository<TarifaHotel>
  implements ITarifaRepository
{
  constructor() {
    super("tarifas.json");
  }

  findByTipo(tipo: TipoHabitacion): TarifaHotel | null {
    const items = this.findAll();
    return items.find(t => (t as any).tipoHabitacion === tipo) ?? null;
  }
}