import type { Dictionary } from 'util-ts-types';

export const normalizeMDXComponentAttrs = (attributes: Dictionary<unknown>) => {
  const parsedAttrs = Object.entries(attributes)?.map(([key, val]) => {
    return {
      type: 'mdxJsxAttribute',
      name: key,
      value: val,
    };
  });

  return parsedAttrs;
};
