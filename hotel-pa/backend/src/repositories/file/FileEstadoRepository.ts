import { JsonRepository } from "./JsonRepository";

export type EntidadEstado = "RESERVA" | "PAGO" | "ESTADIA" | "HABITACION";

export interface EstadoDTO {
  id: number;
  entidad: EntidadEstado;
  codigo: string;       // "PENDIENTE", "CONFIRMADA", etc.
  descripcion: string;
}

export class FileEstadoRepository extends JsonRepository<EstadoDTO> {
  constructor() {
    super("estados.json");
  }

  async findByEntidad(entidad: EntidadEstado): Promise<EstadoDTO[]> {
    const items = await this.findAll();
    return items.filter(e => e.entidad === entidad);
  }

  async findOne(entidad: EntidadEstado, codigo: string): Promise<EstadoDTO | null> {
    const items = await this.findAll();
    const c = codigo.trim().toUpperCase();
    return items.find(e => e.entidad === entidad && e.codigo.toUpperCase() === c) ?? null;
  }
}