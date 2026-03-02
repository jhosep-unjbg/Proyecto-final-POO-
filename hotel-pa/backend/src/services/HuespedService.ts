import { Huesped } from "../models/Huesped";
import { IHuespedRepository } from "../repositories/interfaces/IHuespedRepository";

export class HuespedService {
  constructor(private readonly repo: IHuespedRepository) {}

  crear(data: {
    nombres: string;
    apellidos: string;
    dni: string;
    telefono: string;
    email?: string;
  }): Huesped {
    if (!data.nombres) throw new Error("Nombres requeridos");
    if (!data.apellidos) throw new Error("Apellidos requeridos");
    if (!data.dni) throw new Error("DNI requerido");
    if (!data.telefono) throw new Error("Telefono requerido");

    return this.repo.create(data);
  }

  buscar(filtro: {
    nombres?: string;
    apellidos?: string;
    dni?: string;
    telefono?: string;
  }): Huesped[] {
    return this.repo.search(filtro);
  }
}