import { Dictionary } from 'lodash';
import type { MdxJsxAttribute, MdxJsxExpressionAttribute } from 'mdast-util-mdx-jsx';
export declare class MdxAttrNodeFactory {
    static createMdxJsxAttributeNodes(attributes: Dictionary<any>): (MdxJsxExpressionAttribute | MdxJsxAttribute)[];
    static createMdxJsxLiteralAttributeNode(name: string, value: string | number | boolean): MdxJsxAttribute;
    static createMdxJsxExpressionAttributeNode(name: string, value: Dictionary<any>): MdxJsxExpressionAttribute;
}
//# sourceMappingURL=MdxAttrNodeFactory.d.ts.map