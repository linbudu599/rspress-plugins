import { ESTreeNodeFactory } from './ESTreeNodeFactory';
import { isObject } from '../Utils/is';

import type {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
} from 'mdast-util-mdx-jsx';
import type { Dictionary } from 'util-ts-types';

export class MdxAttrNodeFactory {
  public static createMdxJsxAttributeNodes(attributes: Dictionary<any>) {
    const parsedAttrs = Object.entries(attributes)
      ?.filter(([_, v]) => typeof v !== 'undefined' && v !== null)
      ?.map(([key, val]) => {
        return isObject(val) || Array.isArray(val)
          ? MdxAttrNodeFactory.createMdxJsxExpressionAttributeNode(key, val)
          : MdxAttrNodeFactory.createMdxJsxLiteralAttributeNode(key, val);
      });

    return parsedAttrs;
  }

  public static createMdxJsxLiteralAttributeNode(
    name: string,
    value: string | number | boolean,
  ): MdxJsxAttribute {
    return {
      type: 'mdxJsxAttribute',
      name,
      value: value.toString(),
    };
  }

  public static createMdxJsxExpressionAttributeNode(
    name: string,
    value: Dictionary<any>,
  ): MdxJsxExpressionAttribute {
    return {
      type: 'mdxJsxExpressionAttribute',
      value: `{...${JSON.stringify({
        [name]: value,
      })}`,
      data: {
        estree: ESTreeNodeFactory.createESTreeProgramNode([
          ESTreeNodeFactory.createSpreadObjectExpressionNode({
            [name]: value,
          }),
        ]),
      },
    };
  }
}
