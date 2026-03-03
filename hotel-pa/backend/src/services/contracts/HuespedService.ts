import { Huesped } from "../../models/Huesped";
import { HuespedFiltroBusqueda } from "../../models/HuespedFiltroBusqueda";

export interface IHuespedService {
  crear(data: Omit<Huesped, "id">): Huesped;
  obtenerPorId(id: number): Huesped | null;
  buscar(filtro: HuespedFiltroBusqueda): Huesped[];
  listar(): Huesped[];
  actualizar(id: number, data: Partial<Omit<Huesped, "id">>): Huesped | null;
  eliminar(id: number): boolean;
}