import { TipoHabitacion } from "./TipoHabitacion";

export class TarifaHotel {
    constructor(
        private tipo: TipoHabitacion,
        private precioPorNoche: number
    ) {}

    calcularTotal(noches: number): number {
        return noches * this.precioPorNoche;
    }
}
