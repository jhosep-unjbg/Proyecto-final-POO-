import { ReservaHotel } from "../../models/ReservaHotel";
import { EstadoReserva } from "../../models/enums/EstadoReserva";

type ReservaCreateDTO = {
  huespedId: number;
  habitacionId: number;
  fechaInicio: Date;
  fechaFin: Date;
};

export class ReservaService {
  private reservas: ReservaHotel[] = [];

  listar(): ReservaHotel[] {
    return this.reservas;
  }

  crear(data: ReservaCreateDTO): ReservaHotel {
    const newId =
      this.reservas.length > 0 ? Math.max(...this.reservas.map(r => r.id)) + 1 : 1;

    const nueva = new ReservaHotel(
      newId,
      data.huespedId,
      data.habitacionId,
      data.fechaInicio,
      data.fechaFin,
      EstadoReserva.PENDIENTE
    );

    this.reservas.push(nueva);
    return nueva;
  }

  confirmar(id: number): ReservaHotel {
    const r = this.reservas.find(x => x.id === id);
    if (!r) throw new Error("Reserva no encontrada");

    r.estado = EstadoReserva.CONFIRMADA;
    return r;
  }

  cancelar(id: number): ReservaHotel {
    const r = this.reservas.find(x => x.id === id);
    if (!r) throw new Error("Reserva no encontrada");

    r.estado = EstadoReserva.CANCELADA;
    return r;
  }
}