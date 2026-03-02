export class Estadia {
  constructor(
    public id: number,
    public reservaId: number,
    public fechaCheckIn: Date,
    public fechaCheckOut: Date | null
  ) {}
}