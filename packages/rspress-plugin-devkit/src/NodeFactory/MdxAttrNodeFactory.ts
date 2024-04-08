import { Dictionary } from 'lodash';
import type {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
} from 'mdast-util-mdx-jsx';
import { ESTreeNodeFactory } from './ESTreeNodeFactory';

export class MdxAttrNodeFactory {
  public static createMdxJsxAttributeNode(
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
          ESTreeNodeFactory.createSpreadExpressionNode({
            [name]: value,
          }),
        ]),
      },
    };
  }
}
