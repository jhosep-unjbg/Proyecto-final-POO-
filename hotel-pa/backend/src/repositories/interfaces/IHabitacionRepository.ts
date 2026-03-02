import { Habitacion } from "../../models/Habitacion";

export interface IHabitacionRepository {
  findAll(): Habitacion[];
  findById(id: number): Habitacion | null;

  create(data: Omit<Habitacion, "id">): Habitacion;
  update(entity: Habitacion): Habitacion;
  delete(id: number): void;
}
