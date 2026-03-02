import path from "path";
import { FileStore } from "./FileStore";

export interface WithId {
  id: number;
}

export abstract class JsonRepository<T extends WithId> {
  protected store: FileStore;

  constructor(
    protected fileName: string,
    baseDir: string = path.join(process.cwd(), "data")
  ) {
    this.store = new FileStore(baseDir);
  }

  protected readAll(): T[] {
    const data = this.store.read<T[]>(this.fileName);
    return Array.isArray(data) ? data : [];
  }

  protected writeAll(items: T[]): void {
    this.store.write(this.fileName, items);
  }

  // ✅ PUBLIC + sync
  public findAll(): T[] {
    return this.readAll();
  }

  public findById(id: number): T | null {
    const items = this.readAll();
    return items.find(x => x.id === id) ?? null;
  }

  // ✅ PUBLIC + sync + firma compatible con tus interfaces
  public create(data: Omit<T, "id">): T {
    const items = this.readAll();
    const nextId =
      items.length === 0 ? 1 : Math.max(...items.map(x => x.id)) + 1;

    const entity = { id: nextId, ...data } as T;
    items.push(entity);
    this.writeAll(items);
    return entity;
  }

  public update(entity: T): T {
    const items = this.readAll();
    const idx = items.findIndex(x => x.id === entity.id);
    if (idx === -1) throw new Error(`No existe id=${entity.id} en ${this.fileName}`);

    items[idx] = entity;
    this.writeAll(items);
    return entity;
  }

  public delete(id: number): void {
    const items = this.readAll();
    this.writeAll(items.filter(x => x.id !== id));
  }
}