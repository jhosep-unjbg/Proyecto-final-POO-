import { TipoHabitacion } from "./Tipohabitacion";

export class Habitacion {
  constructor(
    public numero: number,
    public tipo: TipoHabitacion,
    public precioPorNoche: number,
    public disponible: boolean = true
  ) {}

  reservar() {
    this.disponible = false;
  }

  liberar() {
    this.disponible = true;
  }
}