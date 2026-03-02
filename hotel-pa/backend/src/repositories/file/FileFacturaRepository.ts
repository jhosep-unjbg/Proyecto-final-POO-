import { JsonRepository } from "./JsonRepository";

export interface FacturaItemDTO {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface FacturaDTO {
  id: number;
  numero: string;      // "F001-000123"
  reservaId: number;
  pagoId?: number | null;
  fecha: string;       // ISO
  total: number;
  items: FacturaItemDTO[];
}

export class FileFacturaRepository extends JsonRepository<FacturaDTO> {
  constructor() {
    super("facturas.json");
  }

  async findByReserva(reservaId: number): Promise<FacturaDTO[]> {
    const items = await this.findAll();
    return items.filter(f => f.reservaId === reservaId);
  }
}