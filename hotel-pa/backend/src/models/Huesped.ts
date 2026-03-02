export class Huesped {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public dni: string,
    public telefono: string,
    public email?: string
  ) {}

  getNombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`.trim();
  }
}