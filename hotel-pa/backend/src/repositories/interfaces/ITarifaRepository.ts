import { TarifaHotel } from "../../models/TarifaHotel";
import { TipoHabitacion } from "../../models/TipoHabitacion";

export interface ITarifaRepository {
  findAll(): TarifaHotel[];
  findById(id: number): TarifaHotel | null;

  create(data: Omit<TarifaHotel, "id">): TarifaHotel;
  update(entity: TarifaHotel): TarifaHotel;
  delete(id: number): void;

  findByTipo(tipo: TipoHabitacion): TarifaHotel | null;
}