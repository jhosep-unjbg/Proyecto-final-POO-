import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";
import { Habitacion } from "../models/Habitacion";
import { FileHabitacionRepository } from "../repositories/file/FileHabitacionRepository";

type HabitacionCreateDTO = {
  numero: string;
  piso: number;
  tipoHabitacionId: number;
};

type HabitacionUpdateDTO = Partial<{
  numero: string;
  piso: number;
  tipoHabitacionId: number;
  estado: EstadoHabitacion;
}>;

export class HabitacionService {
  private repository = new FileHabitacionRepository();

  // alias para compatibilidad con código viejo (HotelSystem)
  listar(): Habitacion[] {
    return this.getAll();
  }

  crear(dto: HabitacionCreateDTO): Habitacion {
    return this.create(dto);
  }

  getAll(): Habitacion[] {
    return this.repository.findAll();
  }

  getById(id: number): Habitacion | undefined {
    return this.repository.findById(id);
  }

  create(dto: HabitacionCreateDTO): Habitacion {
    const all = this.repository.findAll();

    const existsNumero = all.some(
      h => h.numero.toLowerCase() === dto.numero.toLowerCase()
    );

    if (existsNumero) {
      throw new Error(`Ya existe una habitación con número: ${dto.numero}`);
    }

    const newId =
      all.length > 0 ? Math.max(...all.map(h => h.id)) + 1 : 1;

    const nueva = new Habitacion(
      newId,
      dto.numero,
      dto.piso,
      dto.tipoHabitacionId,
      EstadoHabitacion.DISPONIBLE
    );

    // ✅ CORRECTO (ya no save)
    return this.repository.create(nueva);
  }

  update(id: number, dto: HabitacionUpdateDTO): Habitacion {
    const actual = this.repository.findById(id);
    if (!actual) throw new Error("Habitación no encontrada");

    if (dto.numero && dto.numero.toLowerCase() !== actual.numero.toLowerCase()) {
      const all = this.repository.findAll();
      const existsNumero = all.some(
        h => h.id !== id && h.numero.toLowerCase() === dto.numero!.toLowerCase()
      );
      if (existsNumero)
        throw new Error(`Ya existe una habitación con número: ${dto.numero}`);
    }

    const actualizado: Habitacion = { ...actual, ...dto };
    return this.repository.update(actualizado);
  }

  delete(id: number): boolean {
    const h = this.repository.findById(id);
    if (!h) return false;

    if (h.estado === EstadoHabitacion.OCUPADA) {
      throw new Error("No se puede eliminar una habitación OCUPADA");
    }

    return this.repository.delete(id);
  }

  // 🔥 alias que tu route está usando
  cambiarEstado(id: number, estado: EstadoHabitacion): Habitacion {
    return this.changeEstado(id, estado);
  }

  changeEstado(id: number, nuevoEstado: EstadoHabitacion): Habitacion {
    const h = this.repository.findById(id);
    if (!h) throw new Error("Habitación no encontrada");

    if (
      h.estado === EstadoHabitacion.OCUPADA &&
      nuevoEstado === EstadoHabitacion.DISPONIBLE
    ) {
      throw new Error(
        "No puedes pasar de OCUPADA a DISPONIBLE directamente."
      );
    }

    const actualizado: Habitacion = { ...h, estado: nuevoEstado };
    return this.repository.update(actualizado);
  }

  getDisponibles(tipoHabitacionId?: number): Habitacion[] {
    return this.repository.findAll().filter(h => {
      const okEstado = h.estado === EstadoHabitacion.DISPONIBLE;
      const okTipo = tipoHabitacionId
        ? h.tipoHabitacionId === tipoHabitacionId
        : true;
      return okEstado && okTipo;
    });
  }

  isReservable(id: number): boolean {
    const h = this.repository.findById(id);
    return !!h && h.estado === EstadoHabitacion.DISPONIBLE;
  }
}