import { ReservaHotel } from "./ReservaHotel";

export class HistorialReserva {
  constructor(
    public reservas: ReservaHotel[] = []
  ) {}

  agregarReserva(reserva: ReservaHotel) {
    this.reservas.push(reserva);
  }

  listarReservas(): ReservaHotel[] {
    return this.reservas;
  }
}