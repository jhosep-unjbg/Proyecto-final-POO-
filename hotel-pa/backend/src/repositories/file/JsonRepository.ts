import * as fs from "fs";
import * as path from "path";

export class JsonRepository<T extends { id: number }> {
  private readonly filePath: string;

  constructor(filename: string) {
    this.filePath = path.join(process.cwd(), "data", filename);

    // asegúrate que exista la carpeta data
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // asegúrate que exista el archivo
    if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, "[]", "utf-8");
  }

  protected read(): T[] {
    const raw = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(raw) as T[];
  }

  protected write(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  findAll(): T[] {
    return this.read();
  }

  // ✅ devuelve null (no undefined)
  findById(id: number): T | null {
    return this.read().find(i => i.id === id) ?? null;
  }

  create(entity: T): T {
    const items = this.read();
    items.push(entity);
    this.write(items);
    return entity;
  }

  update(entity: T): T {
    const items = this.read();
    const idx = items.findIndex(i => i.id === entity.id);
    if (idx === -1) throw new Error("No encontrado para actualizar");

    items[idx] = entity;
    this.write(items);
    return entity;
  }

  delete(id: number): boolean {
  const items = this.read();
  const newItems = items.filter(i => i.id !== id);

  if (newItems.length === items.length) {
    return false; // no existía
  }

  this.write(newItems);
  return true; // eliminado correctamente
}
}