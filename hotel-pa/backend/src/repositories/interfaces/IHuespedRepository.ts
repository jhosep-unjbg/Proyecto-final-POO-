import { Huesped } from "../../models/Huesped";

export interface HuespedFiltro {
  nombres?: string;
  apellidos?: string;
  dni?: string;
  telefono?: string;
}

export interface IHuespedRepository {
  findAll(): Huesped[];
  findById(id: number): Huesped | null;

  create(data: Omit<Huesped, "id">): Huesped;
  update(entity: Huesped): Huesped;
  delete(id: number): void;

  // opcionales
  findByDni?(dni: string): Huesped | null;
  search?(filtro: HuespedFiltro): Huesped[];
}