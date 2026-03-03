import { Habitacion } from "../models/Habitacion";
import { EstadoHabitacion } from "../models/enums/EstadoHabitacion";
import { FileCambioPrecioHabitacionRepository } from "../repositories/file/FileCambioPrecioHabitacionRepository";
import { IHabitacionRepository } from "../repositories/interfaces/IHabitacionRepository";
import { CambioPrecioHabitacion } from "../models/CambioPrecioHabitacion";

type HabitacionCreateDTO = {
  numero: string;
  piso: number;
  tipoHabitacionId: number;
  precioPorNoche: number;
};

type HabitacionUpdateDTO = Partial<{
  numero: string;
  piso: number;
  tipoHabitacionId: number;
  precioPorNoche: number;
  estado: EstadoHabitacion;
}>;

export class HabitacionService {
  constructor(
    private readonly repository: IHabitacionRepository,
    private readonly cambiosPrecioRepository = new FileCambioPrecioHabitacionRepository()
  ) {}

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
    if (dto.precioPorNoche <= 0) throw new Error("El precio por noche debe ser mayor a 0");

    const newId = all.length > 0 ? Math.max(...all.map((h) => h.id)) + 1 : 1;

    const nueva = new Habitacion(
      newId,
      dto.numero,
      dto.piso,
      dto.tipoHabitacionId,
      dto.precioPorNoche,
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

    if (dto.precioPorNoche != null && dto.precioPorNoche <= 0) {
      throw new Error("El precio por noche debe ser mayor a 0");
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


  historialCambiosPrecio(habitacionId?: number): CambioPrecioHabitacion[] {
    if (habitacionId != null) {
      return this.cambiosPrecioRepository.findByHabitacionId(habitacionId);
    }

    return this.cambiosPrecioRepository.findAll();
  }
  cambiarPrecio(id: number, nuevoPrecio: number, rolUsuario: string, adminUsuario: string): Habitacion {
    const habitacion = this.repository.findById(id);
    if (!habitacion) throw new Error("Habitación no encontrada");
    if (rolUsuario.toLowerCase() !== "admin") {
      throw new Error("Solo el administrador puede cambiar el precio de una habitación");
    }
    if (nuevoPrecio <= 0) throw new Error("El nuevo precio debe ser mayor a 0");

    const precioAnterior = habitacion.precioPorNoche;
    const actualizada: Habitacion = { ...habitacion, precioPorNoche: nuevoPrecio };
    const guardada = this.repository.update(actualizada);

    const cambios = this.cambiosPrecioRepository.findAll();
    const nuevoId = cambios.length > 0 ? Math.max(...cambios.map((c) => c.id)) + 1 : 1;
    const cambio = new CambioPrecioHabitacion(
      nuevoId,
      id,
      precioAnterior,
      nuevoPrecio,
      adminUsuario
    );

    this.cambiosPrecioRepository.create(cambio);

    return guardada;
  }
}
