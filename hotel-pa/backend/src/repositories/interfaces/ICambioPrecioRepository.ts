import { HistorialTarifaHabitacion } from "../../models/HistorialTarifaHabitacion";

export interface ICambioPrecioRepository {
  create(data: Omit<HistorialTarifaHabitacion, "id">): HistorialTarifaHabitacion;
  findByTipo(tipoHabitacion: string): HistorialTarifaHabitacion[];
}