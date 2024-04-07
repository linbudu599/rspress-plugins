import type { MaybeArray } from 'util-ts-types';

export const ensureArray = <T>(val: MaybeArray<T>): T[] => {
  return Array.isArray(val) ? val : [val];
};
