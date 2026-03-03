import fs from "fs";
import path from "path";

export class FileStore {
  constructor(private baseDir: string) {}

  private fullPath(fileName: string): string {
    return path.join(this.baseDir, fileName);
  }

  private ensureFileExists(fileName: string): void {
    const p = this.fullPath(fileName);

    if (!fs.existsSync(p)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
      fs.writeFileSync(p, "[]", "utf-8");
    }
  }

  read<T>(fileName: string): T {
    this.ensureFileExists(fileName);
    const raw = fs.readFileSync(this.fullPath(fileName), "utf-8");
    return JSON.parse(raw) as T;
  }

  write<T>(fileName: string, data: T): void {
    this.ensureFileExists(fileName);
    fs.writeFileSync(
      this.fullPath(fileName),
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }
}