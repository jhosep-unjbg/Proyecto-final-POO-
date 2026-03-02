import { ReservaHotel } from "../../models/ReservaHotel";

export interface IReservaService {
  crear(data: Omit<ReservaHotel, "id" | "estado"> & Partial<Pick<ReservaHotel, "estado">>): ReservaHotel;
  obtenerPorId(id: number): ReservaHotel | null;
  listar(): ReservaHotel[];
  confirmar(id: number): ReservaHotel;
  cancelar(id: number, motivo?: string): ReservaHotel;
}