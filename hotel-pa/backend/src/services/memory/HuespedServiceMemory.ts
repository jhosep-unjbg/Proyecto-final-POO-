import { Huesped } from "../../models/Huesped";
import { HuespedFiltroBusqueda } from "../../models/HuespedFiltroBusqueda";
import { IHuespedService } from "../contracts/HuespedService";
import { includesNormalized, nextId } from "./_utils";

export class HuespedServiceMemory implements IHuespedService {
  private readonly data: Huesped[] = [];
  private readonly idCounter = { value: 0 };

  crear(dto: Omit<Huesped, "id">): Huesped {
    // Validaciones básicas
    if (!dto.nombres?.trim()) throw new Error("nombres es requerido");
    if (!dto.apellidos?.trim()) throw new Error("apellidos es requerido");
    if (!dto.dni?.trim()) throw new Error("dni es requerido");
    if (!dto.telefono?.trim()) throw new Error("telefono es requerido");

    // dni único (regla común)
    const existe = this.data.some(h => h.dni === dto.dni);
    if (existe) throw new Error("Ya existe un huésped con ese DNI.");

    const entity = new Huesped(
      nextId(this.idCounter),
      dto.nombres,
      dto.apellidos,
      dto.dni,
      dto.telefono,
      dto.email
    );

    this.data.push(entity);
    return entity;
  }

  obtenerPorId(id: number): Huesped | null {
    return this.data.find(h => h.id === id) ?? null;
  }

  listar(): Huesped[] {
    return [...this.data];
  }

  buscar(filtro: HuespedFiltroBusqueda): Huesped[] {
    const nombres = filtro.nombres ?? "";
    const apellidos = filtro.apellidos ?? "";
    const dni = filtro.dni ?? "";
    const telefono = filtro.telefono ?? "";

    return this.data.filter(h => {
      return (
        includesNormalized(h.nombres, nombres) &&
        includesNormalized(h.apellidos, apellidos) &&
        includesNormalized(h.dni, dni) &&
        includesNormalized(h.telefono, telefono)
      );
    });
  }

  actualizar(id: number, dto: Partial<Omit<Huesped, "id">>): Huesped | null {
    const h = this.obtenerPorId(id);
    if (!h) return null;

    // si cambia DNI, validar único
    if (dto.dni && dto.dni !== h.dni) {
      const existe = this.data.some(x => x.dni === dto.dni);
      if (existe) throw new Error("Ya existe un huésped con ese DNI.");
    }

    if (dto.nombres !== undefined) h.nombres = dto.nombres;
    if (dto.apellidos !== undefined) h.apellidos = dto.apellidos;
    if (dto.dni !== undefined) h.dni = dto.dni;
    if (dto.telefono !== undefined) h.telefono = dto.telefono;
    if (dto.email !== undefined) h.email = dto.email;

    return h;
  }

  eliminar(id: number): boolean {
    const idx = this.data.findIndex(h => h.id === id);
    if (idx === -1) return false;
    this.data.splice(idx, 1);
    return true;
  }
}