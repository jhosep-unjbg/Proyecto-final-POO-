import { MetodoPago } from "./MetodoPago";

export class Pago {
  constructor(
    public id: number,
    public reservaId: number,
    public monto: number,
    public metodo: MetodoPago,
    public fecha: Date = new Date(),
    public moneda: string = "PEN",
    public referencia?: string // num operación / voucher
  ) {}
}