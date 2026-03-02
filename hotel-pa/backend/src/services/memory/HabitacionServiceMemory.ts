import { Habitacion } from "../../models/Habitacion";
import { IHabitacionService } from "../contracts/HabitacionService";
import { nextId } from "./_utils";

export class HabitacionServiceMemory implements IHabitacionService {
  private readonly data: Habitacion[] = [];
  private readonly idCounter = { value: 0 };

  crear(dto: Omit<Habitacion, "id">): Habitacion {
    if (!dto.numero?.trim()) throw new Error("numero es requerido");
    if (dto.piso === undefined || dto.piso === null) throw new Error("piso es requerido");
    if (!dto.tipo) throw new Error("tipo es requerido");
    if (!dto.capacidad || dto.capacidad <= 0) throw new Error("capacidad debe ser > 0");

    // numero único
    const existe = this.data.some(h => h.numero === dto.numero);
    if (existe) throw new Error("Ya existe una habitación con ese número.");

    const entity = new Habitacion(
      nextId(this.idCounter),
      dto.numero,
      dto.piso,
      dto.tipo,
      dto.capacidad,
      dto.activa ?? true
    );

    this.data.push(entity);
    return entity;
  }

  obtenerPorId(id: number): Habitacion | null {
    return this.data.find(h => h.id === id) ?? null;
  }

  listar(): Habitacion[] {
    return [...this.data];
  }

  actualizar(id: number, dto: Partial<Omit<Habitacion, "id">>): Habitacion | null {
    const h = this.obtenerPorId(id);
    if (!h) return null;

    if (dto.numero !== undefined && dto.numero !== h.numero) {
      const existe = this.data.some(x => x.numero === dto.numero);
      if (existe) throw new Error("Ya existe una habitación con ese número.");
      h.numero = dto.numero;
    }

    if (dto.piso !== undefined) h.piso = dto.piso;
    if (dto.tipo !== undefined) h.tipo = dto.tipo;
    if (dto.capacidad !== undefined) {
      if (dto.capacidad <= 0) throw new Error("capacidad debe ser > 0");
      h.capacidad = dto.capacidad;
    }
    if (dto.activa !== undefined) h.activa = dto.activa;

    return h;
  }

  eliminar(id: number): boolean {
    const idx = this.data.findIndex(h => h.id === id);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }
}