export class Estadia {
  constructor(
    public id: number,
    public reservaId: number,
    public checkIn: Date,
    public checkOut?: Date,
    public estado: "ACTIVA" | "FINALIZADA" = "ACTIVA"
  ) {}

  finalizar(checkOut: Date = new Date()): void {
    this.checkOut = checkOut;
    this.estado = "FINALIZADA";
  }
}