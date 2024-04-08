import { Dictionary, isObject } from 'lodash';
import type {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
} from 'mdast-util-mdx-jsx';
import { ESTreeNodeFactory } from './ESTreeNodeFactory';

export class MdxAttrNodeFactory {
  public static createMdxJsxAttributeNodes(attributes: Dictionary<any>) {
    const parsedAttrs = Object.entries(attributes)?.map(([key, val]) => {
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
