import { Recepcionista } from "../models/Recepcionista";
import { RecepcionistaRepository } from "../repositories/file/FileRecepcionistaRepository";

type RecepcionistaCreateDTO = Omit<Recepcionista, "id" | "createdAt">;

export class RecepcionistaService {
  constructor(private readonly repo: RecepcionistaRepository) {}

  // ✅ alias para tu app.ts
  listar(): Recepcionista[] {
    return this.getAll();
  }

  // ✅ alias para tu app.ts
  crear(input: RecepcionistaCreateDTO): Recepcionista {
    return this.create(input);
  }

  getAll(): Recepcionista[] {
    return this.repo.findAll();
  }

  create(input: RecepcionistaCreateDTO): Recepcionista {
    const all = this.repo.findAll();
    const newId = all.length > 0 ? Math.max(...all.map(r => r.id)) + 1 : 1;

    const nuevo: Recepcionista = {
      id: newId,
      ...input,
      createdAt: new Date().toISOString()
    };

    return this.repo.create(nuevo);
  }

  update(entity: Recepcionista): Recepcionista {
    return this.repo.update(entity);
  }

  delete(id: number): boolean {
    return this.repo.delete(id);
  }
}