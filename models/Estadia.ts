import { ReservaHotel } from "./ReservasHotel";

export class Estadia {
    private activa: boolean = false;

    constructor(private reserva: ReservaHotel) {}

    iniciar(): void {
        this.activa = true;
    }

    finalizar(): void {
        this.activa = false;
    }

    estaActiva(): boolean {
        return this.activa;
    }
}
