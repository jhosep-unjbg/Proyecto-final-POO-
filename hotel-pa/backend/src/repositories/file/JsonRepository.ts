import * as fs from "fs";
import * as path from "path";

export class JsonRepository<T extends { id: number }> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(__dirname, "../../../data", fileName);

    // Si el archivo no existe, lo crea
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  private readFile(): T[] {
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data) as T[];
  }

  private writeFile(data: T[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  public findAll(): T[] {
    return this.readFile();
  }

  public findById(id: number): T | undefined {
    return this.readFile().find((item) => item.id === id);
  }

  public create(entity: T): T {
    const data = this.readFile();
    data.push(entity);
    this.writeFile(data);
    return entity;
  }

  public update(entity: T): T {
    const data = this.readFile();
    const index = data.findIndex((item) => item.id === entity.id);

    if (index === -1) {
      throw new Error("Entidad no encontrada para actualizar");
    }

    data[index] = entity;
    this.writeFile(data);
    return entity;
  }

  public delete(id: number): boolean {
    const data = this.readFile();
    const newData = data.filter((item) => item.id !== id);

    if (newData.length === data.length) {
      return false;
    }

    this.writeFile(newData);
    return true;
  }
}