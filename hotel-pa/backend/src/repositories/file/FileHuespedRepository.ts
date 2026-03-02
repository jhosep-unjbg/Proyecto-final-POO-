import { JsonRepository } from "./JsonRepository";
import { Huesped } from "../../models/Huesped";

export class HuespedRepository extends JsonRepository<Huesped> {
  constructor() {
    super("huespedes.json");
  }
}