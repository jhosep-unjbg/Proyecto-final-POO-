import { ReservaHotel } from "./ReservaHotel";

export class PaqueteTuristico {
  constructor(
    public id: number,
    public nombre: string,
    public reservas: ReservaHotel[] = [],
    public descripcion?: string
  ) {}

  agregarReserva(reserva: ReservaHotel) {
    this.reservas.push(reserva);
  }

  calcularTotalPaquete(): number {
    return this.reservas.reduce((total, r) => total + r.calcularTotal(), 0);
  }
}