export function nightsBetween(start: Date, end: Date): number {
  const s = new Date(start); s.setHours(0,0,0,0);
  const e = new Date(end);   e.setHours(0,0,0,0);
  const diff = e.getTime() - s.getTime();
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)));
}