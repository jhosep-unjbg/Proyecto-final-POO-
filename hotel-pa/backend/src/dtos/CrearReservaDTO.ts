export interface CrearReservaDTO {
  huespedId: number;
  habitacionId: number;
  fechaInicio: Date;
  fechaFin: Date;
  paqueteTuristicoId?: number;
  observaciones?: string;
}