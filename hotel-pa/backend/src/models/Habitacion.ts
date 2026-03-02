import { EstadoHabitacion } from "./enums/EstadoHabitacion";

export class Habitacion {
  constructor(
    public id: number,
    public numero: string,
    public piso: number,
    public tipoHabitacionId: number,
    public estado: EstadoHabitacion
  ) {}
}