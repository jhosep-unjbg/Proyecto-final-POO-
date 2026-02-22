import { Cliente } from "./Clientes";
import { Habitacion } from "./Habitacion";

export class Reserva {
  constructor(
    public id: number,
    public cliente: Cliente,
    public habitacion: Habitacion,
    public fechaInicio: Date,
    public fechaFin: Date
  ) {}

  calcularTotal(): number {
    const dias =
      (this.fechaFin.getTime() - this.fechaInicio.getTime()) /
      (1000 * 60 * 60 * 24);

    return dias * this.habitacion.precioPorNoche;
  }
}