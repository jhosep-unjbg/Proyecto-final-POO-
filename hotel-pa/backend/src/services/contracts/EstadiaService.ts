import { Estadia } from "../../models/Estadia";

export interface IEstadiaService {
  crearDesdeReserva(reservaId: number, checkIn: Date): Estadia;
  obtenerPorId(id: number): Estadia | null;
  listar(): Estadia[];
  finalizar(id: number, checkOut: Date): Estadia;
}