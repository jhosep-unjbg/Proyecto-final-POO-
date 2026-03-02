export type HuespedFrecuenciaDTO = {
  huespedId: number;
  nombreCompleto: string;
  dni: string;
  telefono: string;
  visitas: number;
  nochesTotales: number;
  ultimaVisita: string | null;
  gastoTotal: number;
};