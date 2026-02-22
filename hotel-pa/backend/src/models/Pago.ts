import { ReservaHotel } from "./ReservaHotel";

export class Pago {
  constructor(
    public id: number,
    public reserva: ReservaHotel,
    public monto: number,
    public fechaPago: Date,
    public metodo: string // Ej: Tarjeta, Efectivo
  ) {}
}