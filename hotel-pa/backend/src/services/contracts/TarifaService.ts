import { TarifaHotel } from "../../models/TarifaHotel";
import { TipoHabitacion } from "../../models/TipoHabitacion";

export interface ITarifaService {
  crearOActualizar(tarifa: Omit<TarifaHotel, "id">): TarifaHotel;
  obtenerVigente(tipo: TipoHabitacion, fecha: Date): TarifaHotel | null;
  listar(): TarifaHotel[];
}