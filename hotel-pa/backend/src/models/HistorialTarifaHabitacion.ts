import { TipoHabitacion } from "../models/enums/TipoHabitacion";
import { MotivoCambioTarifa } from "./MotivoCambioTarifa";

export class HistorialTarifaHabitacion {
  constructor(
    public id: number,
    public tipoHabitacion: TipoHabitacion,
    public precioAnterior: number,
    public precioNuevo: number,
    public moneda: string = "PEN",
    public fechaCambio: Date = new Date(),
    public usuarioId?: number,         // opcional: quién cambió el precio
    public motivo: MotivoCambioTarifa = MotivoCambioTarifa.AJUSTE_MANUAL,
    public observacion?: string
  ) {}

  getDiferencia(): number {
    return this.precioNuevo - this.precioAnterior;
  }

  getPorcentajeCambio(): number {
    if (this.precioAnterior === 0) return 0;
    return (this.getDiferencia() / this.precioAnterior) * 100;
  }
}