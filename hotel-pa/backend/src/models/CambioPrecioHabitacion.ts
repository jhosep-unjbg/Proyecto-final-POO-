export class CambioPrecioHabitacion {
  constructor(
    public id: number,
    public habitacionId: number,
    public precioAnterior: number,
    public precioNuevo: number,
    public adminUsuario: string,
    public fecha: string = new Date().toISOString()
  ) {}
}
