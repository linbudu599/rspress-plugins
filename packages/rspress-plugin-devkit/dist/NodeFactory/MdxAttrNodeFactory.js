import { isObject } from 'lodash';
import { ESTreeNodeFactory } from './ESTreeNodeFactory';
export class MdxAttrNodeFactory {
    static createMdxJsxAttributeNodes(attributes) {
        var _a;
        const parsedAttrs = (_a = Object.entries(attributes)) === null || _a === void 0 ? void 0 : _a.map(([key, val]) => {
            return isObject(val) || Array.isArray(val)
                ? MdxAttrNodeFactory.createMdxJsxExpressionAttributeNode(key, val)
                : MdxAttrNodeFactory.createMdxJsxLiteralAttributeNode(key, val);
        });
        return parsedAttrs;
    }
    static createMdxJsxLiteralAttributeNode(name, value) {
        return {
            type: 'mdxJsxAttribute',
            name,
            value: value.toString(),
        };
    }
    static createMdxJsxExpressionAttributeNode(name, value) {
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
