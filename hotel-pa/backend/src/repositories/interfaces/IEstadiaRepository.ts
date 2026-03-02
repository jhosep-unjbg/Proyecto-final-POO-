import { Estadia } from "../../models/Estadia";

export interface IEstadiaRepository {
  findAll(): Estadia[];
  findById(id: number): Estadia | null;

  create(data: Omit<Estadia, "id">): Estadia;
  update(entity: Estadia): Estadia;
  delete(id: number): void;

  findByReserva(reservaId: number): Estadia | null;
}