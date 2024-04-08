import { Dictionary } from 'util-ts-types';

export function isObject(value: unknown): value is Dictionary {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function isPrimitive(
  value: unknown,
): value is string | number | boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}
