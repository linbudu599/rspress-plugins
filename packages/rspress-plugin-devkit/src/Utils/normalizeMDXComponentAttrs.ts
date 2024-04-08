import type { Dictionary } from 'util-ts-types';
import { MdxAttrNodeFactory } from '../NodeFactory/MdxAttrNodeFactory';
import { isObject } from './is';

export const normalizeMDXComponentAttrs = (attributes: Dictionary<any>) => {
  const parsedAttrs = Object.entries(attributes)?.map(([key, val]) => {
    return isObject(val)
      ? MdxAttrNodeFactory.createMdxJsxExpressionAttributeNode(key, val)
      : MdxAttrNodeFactory.createMdxJsxAttributeNode(key, val);
  });

  return parsedAttrs;
};
