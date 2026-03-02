export abstract class Usuario {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public email: string
  ) {}

  getNombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }
}