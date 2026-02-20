import { TipoHabitacion } from "./TipoHabitacion";

export class Habitacion {
    private disponible: boolean = true;

    constructor(
        private numero: number,
        private tipo: TipoHabitacion
    ) {}

    ocupar(): void {
        this.disponible = false;
    }

    liberar(): void {
        this.disponible = true;
    }

    estaDisponible(): boolean {
        return this.disponible;
    }

    getTipo(): TipoHabitacion {
        return this.tipo;
    }
}
