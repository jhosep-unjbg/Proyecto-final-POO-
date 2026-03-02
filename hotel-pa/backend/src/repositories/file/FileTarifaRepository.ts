import { JsonRepository } from "./JsonRepository";
import { TarifaHotel } from "../../models/TarifaHotel";
import { TipoHabitacion } from "../../models/enums/TipoHabitacion";
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

    // Ajusta el nombre de la propiedad según tu modelo TarifaHotel:
    // - si es "tipoHabitacion" => usa eso
    // - si es "tipo" => cambia abajo a t.tipo
    return items.find(t => t.tipoHabitacion === tipo) ?? null;
  }
}