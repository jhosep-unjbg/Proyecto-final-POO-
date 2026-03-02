import { JsonRepository } from "./JsonRepository";

export interface HistorialReservaDTO {
  id: number;
  huespedId: number;
  fecha: string; // ISO
  criterioBusqueda: string;
}

export class FileHistorialReservaRepository extends JsonRepository<HistorialReservaDTO> {
  constructor() {
    super("historial_reservas.json");
  }

  async findByHuesped(huespedId: number): Promise<HistorialReservaDTO[]> {
    const items = await this.findAll();
    return items.filter(h => h.huespedId === huespedId);
  }
}