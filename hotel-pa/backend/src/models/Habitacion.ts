import { TipoHabitacion } from "./enums/TipoHabitacion";

export class Habitacion {
  constructor(
    public id: number,
    public numero: string, // "101", "A-12"
    public piso: number,
    public tipo: TipoHabitacion,
    public capacidad: number,
    public activa: boolean = true
  ) {}
}