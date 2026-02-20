import { Habitacion } from "../models/Habitacion";

export class HotelService {
    private habitaciones: Habitacion[] = [];

    agregarHabitacion(h: Habitacion): void {
        this.habitaciones.push(h);
    }

    buscarDisponibles(): Habitacion[] {
        return this.habitaciones.filter(h => h.estaDisponible());
    }
}
