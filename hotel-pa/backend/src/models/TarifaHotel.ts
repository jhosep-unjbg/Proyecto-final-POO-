import { TipoHabitacion } from "../models/enums/TipoHabitacion";

export class TarifaHotel {
  constructor(
    public id: number,
    public tipoHabitacion: TipoHabitacion,
    public precioPorNoche: number,
    public moneda: string = "PEN",
    public vigenteDesde?: Date,
    public vigenteHasta?: Date
  ) {}

  esVigente(fecha: Date): boolean {
    const desdeOk = !this.vigenteDesde || fecha >= this.vigenteDesde;
    const hastaOk = !this.vigenteHasta || fecha <= this.vigenteHasta;
    return desdeOk && hastaOk;
  }
}