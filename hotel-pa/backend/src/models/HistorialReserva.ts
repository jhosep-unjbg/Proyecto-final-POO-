import { EstadoReserva } from "./EstadoReserva";

export class HistorialReserva {
  constructor(
    public id: number,
    public reservaId: number,
    public estadoAnterior: EstadoReserva,
    public estadoNuevo: EstadoReserva,
    public fechaCambio: Date = new Date(),
    public motivo?: string
  ) {}
}