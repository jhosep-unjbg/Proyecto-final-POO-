import { Huesped } from "../models/Huesped";
import { IHuespedRepository } from "../repositories/interfaces/IHuespedRepository";

export type HuespedCreateInput = {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email?: string;
};

export class HuespedService {
  constructor(private readonly repo: IHuespedRepository) {}

  create(input: HuespedCreateInput) {
    const data: Omit<Huesped, "id"> = {
      nombre: input.nombres,
      apellido: input.apellidos,
      dni: input.dni,
      telefono: input.telefono,
      email: input.email ?? ""
    };

    return this.repo.create(data);
  }
}