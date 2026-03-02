import { Habitacion } from "../models/Habitacion";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";

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
  constructor(private readonly repository: IHabitacionRepository) {}

  listar(): Habitacion[] {
    return this.repository.findAll();
  }

  obtenerPorId(id: number): Habitacion | null {
    return this.repository.findById(id);
  }

  crear(dto: HabitacionCreateDTO): Habitacion {
    const all = this.repository.findAll();

    const existsNumero = all.some(
      (h) => h.numero.toLowerCase() === dto.numero.toLowerCase()
    );
    if (existsNumero) throw new Error(`Ya existe una habitación con número: ${dto.numero}`);

    const newId = all.length > 0 ? Math.max(...all.map((h) => h.id)) + 1 : 1;

    const nueva = new Habitacion(
      newId,
      dto.numero,
      dto.piso,
      dto.tipoHabitacionId,
      EstadoHabitacion.DISPONIBLE
    );

    return this.repository.create(nueva);
  }

  actualizar(id: number, dto: HabitacionUpdateDTO): Habitacion {
    const actual = this.repository.findById(id);
    if (!actual) throw new Error("Habitación no encontrada");

    if (dto.numero && dto.numero.toLowerCase() !== actual.numero.toLowerCase()) {
      const all = this.repository.findAll();
      const existsNumero = all.some(
        (h) => h.id !== id && h.numero.toLowerCase() === dto.numero!.toLowerCase()
      );
      if (existsNumero) throw new Error(`Ya existe una habitación con número: ${dto.numero}`);
    }

    const actualizado: Habitacion = { ...actual, ...dto };
    return this.repository.update(actualizado);
  }

  eliminar(id: number): boolean {
    const h = this.repository.findById(id);
    if (!h) return false;

    if (h.estado === EstadoHabitacion.OCUPADA) {
      throw new Error("No se puede eliminar una habitación OCUPADA");
    }

    // 👇 esto depende del tipo de retorno real del repo (ver sección B)
    return this.repository.delete(id);
  }

  cambiarEstado(id: number, nuevoEstado: EstadoHabitacion): Habitacion {
    const h = this.repository.findById(id);
    if (!h) throw new Error("Habitación no encontrada");

    if (h.estado === EstadoHabitacion.OCUPADA && nuevoEstado === EstadoHabitacion.DISPONIBLE) {
      throw new Error("No puedes pasar de OCUPADA a DISPONIBLE directamente. Pasa por LIMPIEZA.");
    }

    const actualizado: Habitacion = { ...h, estado: nuevoEstado };
    return this.repository.update(actualizado);
  }
}