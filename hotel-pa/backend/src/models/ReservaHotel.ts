import { Huesped } from "./Huesped";
import { Habitacion } from "./Habitacion";
import { EstadoReserva } from "./Estadoreserva";

export class ReservaHotel {
  constructor(
    public id: number,
    public huesped: Huesped,
    public habitacion: Habitacion,
    public fechaInicio: Date,
    public fechaFin: Date,
    public estado: EstadoReserva = EstadoReserva.PENDIENTE
  ) {}

  calcularTotal(): number {
    const dias =
      (this.fechaFin.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    return dias * this.habitacion.precioPorNoche;
  }
}