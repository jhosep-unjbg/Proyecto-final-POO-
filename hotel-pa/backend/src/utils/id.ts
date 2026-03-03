export function nextId(existingIds: number[]): number {
  return existingIds.length ? Math.max(...existingIds) + 1 : 1;
}