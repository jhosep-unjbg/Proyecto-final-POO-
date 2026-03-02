import { Turno } from "../models/enums/Turno";
import { Recepcionista } from "../models/Recepcionista";
import { RecepcionistaRepository } from "../repositories/file/FileRecepcionistaRepository";

export class RecepcionistaService {
  constructor(private readonly repo: RecepcionistaRepository) {}

  crear(input: Omit<Recepcionista, "id" | "createdAt">): Recepcionista {
    if (!input.nombres.trim()) throw new Error("Nombre requerido");
    if (!input.apellidos.trim()) throw new Error("Apellidos requeridos");
    if (!input.email.trim()) throw new Error("Email requerido");

    // el repo debería crear el id internamente o devolver el creado
    return this.repo.create({
      ...input,
      createdAt: new Date().toISOString(),
    });
  }

  listar(): Recepcionista[] {
    return this.repo.findAll();
  }

  cambiarTurno(id: number, turno: Turno): Recepcionista {
    const r = this.repo.findById(id);
    if (!r) throw new Error("Recepcionista no existe");

    const updated: Recepcionista = { ...r, turno };
    this.repo.update(updated); // update con 1 parámetro (objeto completo)
    return updated;
  }
}