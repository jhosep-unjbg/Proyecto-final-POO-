import { JsonRepository } from "./JsonRepository";
import { Huesped } from "../../models/Huesped";
import { IHuespedRepository } from "../interfaces/IHuespedRepository";

export class FileHuespedRepository
  extends JsonRepository<Huesped>
  implements IHuespedRepository
{
  constructor() {
    super("huespedes.json");
  }
}