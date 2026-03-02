import { EstadoReserva } from "./EstadoReserva";

export class ReservaHotel {
  constructor(
    public id: number,
    public huespedId: number,
    public habitacionId: number,
    public fechaInicio: Date,
    public fechaFin: Date,
    public estado: EstadoReserva = EstadoReserva.PENDIENTE,
    public paqueteTuristicoId?: number,
    public observaciones?: string
  ) {}

  getNoches(): number {
    // noches = diferencia de días entre inicio y fin
    const ms = this.fechaFin.getTime() - this.fechaInicio.getTime();
    const dias = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return Math.max(dias, 0);
  }

  confirmar(): void {
    this.estado = EstadoReserva.CONFIRMADA;
  }

  cancelar(): void {
    this.estado = EstadoReserva.CANCELADA;
  }
}