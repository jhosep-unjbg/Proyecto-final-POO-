export function normalize(s?: string): string {
  return (s ?? "").trim().toLowerCase();
}

export function includesNormalized(haystack: string, needle: string): boolean {
  if (!needle) return true;
  return normalize(haystack).includes(normalize(needle));
}

export function nextId(counter: { value: number }): number {
  counter.value += 1;
  return counter.value;
}