import { EstadoReserva } from "./enums/EstadoReserva";

export class ReservaHotel {
  constructor(
    public id: number,
    public huespedId: number,
    public habitacionId: number,
    public fechaInicio: Date,
    public fechaFin: Date,
    public estado: EstadoReserva
  ) {}
}