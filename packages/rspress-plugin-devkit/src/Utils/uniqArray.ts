export function uniqArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
