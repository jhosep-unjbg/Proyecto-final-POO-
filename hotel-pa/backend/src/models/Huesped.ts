export class Huesped {
  constructor(
    public id: number,
    public nombre: string,
    public email: string,
    public telefono: string
  ) {}

  obtenerInfo(): string {
    return `${this.nombre} - ${this.email}`;
  }
}