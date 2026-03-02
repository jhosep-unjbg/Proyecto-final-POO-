import { TarifaHotel } from "../models/TarifaHotel";
import { TipoHabitacion } from "../models/TipoHabitacion";
import { ITarifaRepository } from "../repositories/interfaces/ITarifaRepository";

export class TarifaService {
  constructor(private readonly repo: ITarifaRepository) {}

  crear(data: Omit<TarifaHotel, "id">): TarifaHotel {
    if ((data as any).tipoHabitacion == null) throw new Error("TipoHabitacion requerido");
    if ((data as any).precioPorNoche == null) throw new Error("Precio por noche requerido");
    if (Number((data as any).precioPorNoche) <= 0) throw new Error("Precio por noche debe ser > 0");

    // Evitar duplicar tarifas por tipo
    const existente = this.repo.findByTipo((data as any).tipoHabitacion as TipoHabitacion);
    if (existente) {
      throw new Error(`Ya existe tarifa para el tipo ${(data as any).tipoHabitacion}`);
    }

    return this.repo.create(data);
  }

  obtenerPorTipo(tipo: TipoHabitacion): TarifaHotel | null {
    return this.repo.findByTipo(tipo);
  }

  listar(): TarifaHotel[] {
    return this.repo.findAll();
  }

  actualizar(id: number, precioPorNoche: number): TarifaHotel {
    const tarifa = this.repo.findById(id);
    if (!tarifa) throw new Error("Tarifa no encontrada");
    if (precioPorNoche <= 0) throw new Error("Precio por noche debe ser > 0");

    (tarifa as any).precioPorNoche = precioPorNoche;
    return this.repo.update(tarifa);
  }
}