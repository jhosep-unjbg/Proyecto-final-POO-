export class Factura {
  constructor(
    public id: number,
    public reservaId: number,
    public total: number,
    public fecha: Date = new Date()
  ) {}
}