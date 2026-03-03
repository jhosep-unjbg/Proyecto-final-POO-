export interface FileEntity {
  id: number;
}

export abstract class FileRepositoryBase<T extends FileEntity> {

  protected abstract readAll(): Promise<T[]>;
  protected abstract writeAll(items: T[]): Promise<void>;

  async findAll(): Promise<T[]> {
    return this.readAll();
  }

  async findById(id: number): Promise<T | null> {
    const items = await this.readAll();
    return items.find(x => x.id === id) ?? null;
  }

  async create(data: Omit<T, "id">): Promise<T> {
    const items = await this.readAll();

    const nextId =
      items.length === 0
        ? 1
        : Math.max(...items.map(x => x.id)) + 1;

    const entity = { id: nextId, ...data } as T;

    items.push(entity);
    await this.writeAll(items);

    return entity;
  }

  async update(id: number, patch: Partial<Omit<T, "id">>): Promise<T> {
    const items = await this.readAll();
    const index = items.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No existe id=${id}`);
    }

    items[index] = {
      ...items[index],
      ...patch,
      id
    } as T;

    await this.writeAll(items);
    return items[index];
  }

  async delete(id: number): Promise<void> {
    const items = await this.readAll();
    await this.writeAll(items.filter(x => x.id !== id));
  }
}