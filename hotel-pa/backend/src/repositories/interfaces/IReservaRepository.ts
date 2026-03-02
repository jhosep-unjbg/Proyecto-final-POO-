import { ReservaHotel } from "../../models/ReservaHotel";

export interface IReservaRepository {
  findAll(): ReservaHotel[];
  findById(id: number): ReservaHotel | null;

  // CORRECCIÓN CLAVE: Omit<ReservaHotel,"id">
  create(data: Omit<ReservaHotel, "id">): ReservaHotel;

  update(entity: ReservaHotel): ReservaHotel;
  delete(id: number): boolean;
}