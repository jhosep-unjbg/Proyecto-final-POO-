import { Habitacion } from "../../models/Habitacion";

export interface IHabitacionService {
  crear(data: Omit<Habitacion, "id">): Habitacion;
  obtenerPorId(id: number): Habitacion | null;
  listar(): Habitacion[];
  actualizar(id: number, data: Partial<Omit<Habitacion, "id">>): Habitacion | null;
  eliminar(id: number): boolean;
}