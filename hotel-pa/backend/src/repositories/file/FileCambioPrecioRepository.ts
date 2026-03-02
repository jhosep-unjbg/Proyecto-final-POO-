import { JsonRepository } from "./JsonRepository";

export interface CambioPrecioDTO {
  id: number;
  tarifaId: number;
  fecha: string; // ISO
  precioAnterior: number;
  precioNuevo: number;
  motivo?: string;
  usuario?: string;
}

export class FileCambioPrecioRepository extends JsonRepository<CambioPrecioDTO> {
  constructor() {
    super("cambios_precio.json");
  }

  async findByTarifa(tarifaId: number): Promise<CambioPrecioDTO[]> {
    const items = await this.findAll();
    return items.filter(c => c.tarifaId === tarifaId);
  }
}