export class TipoHabitacion {
  constructor(
    public id: number,
    public nombre: string, // Ej: Suite, Doble
    public descripcion: string,
    public capacidad: number
  ) {}
}