import { Huesped } from "./Huesped";
import { Habitacion } from "./Habitacion";
import { EstadoReserva } from "./EstadoReserva";
import { Pago } from "./Pagos";
import { HistorialReserva } from "./HistorialReservas";

export class ReservaHotel {
    private estado: EstadoReserva = EstadoReserva.PENDIENTE;
    private pagos: Pago[] = [];
    private historial: HistorialReserva = new HistorialReserva();

    constructor(
        private id: number,
        private huesped: Huesped,
        private habitacion: Habitacion,
        private fechaInicio: Date,
        private fechaFin: Date
    ) {
        this.historial.agregarRegistro("Reserva creada");
    }

    confirmar(): void {
        this.estado = EstadoReserva.CONFIRMADA;
        this.historial.agregarRegistro("Reserva confirmada");
    }

    cancelar(): void {
        this.estado = EstadoReserva.CANCELADA;
        this.historial.agregarRegistro("Reserva cancelada");
    }

    agregarPago(pago: Pago): void {
        this.pagos.push(pago);
        this.historial.agregarRegistro("Pago registrado");
    }

    getEstado(): EstadoReserva {
        return this.estado;
    }
}
