export async function connectDbIfEnabled(): Promise<void> {
  // Ya no usamos TypeORM. Persistencia con FileDb/JSON.
  console.log("Modo FileDb activo. No se usa TypeORM.");
}

