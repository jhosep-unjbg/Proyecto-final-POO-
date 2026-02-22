import { TipoHabitacion } from "./Tipohabitacion";

export class TarifaHotel {
  constructor(
    public tipo: TipoHabitacion,
    public precioPorNoche: number
  ) {}
}