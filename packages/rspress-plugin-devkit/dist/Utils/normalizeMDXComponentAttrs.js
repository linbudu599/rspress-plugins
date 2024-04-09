import { MdxAttrNodeFactory } from '../NodeFactory/MdxAttrNodeFactory';
import { isObject } from './is';
export const normalizeMDXComponentAttrs = (attributes) => {
    var _a;
    const parsedAttrs = (_a = Object.entries(attributes)) === null || _a === void 0 ? void 0 : _a.map(([key, val]) => {
        return isObject(val)
            ? MdxAttrNodeFactory.createMdxJsxExpressionAttributeNode(key, val)
            : MdxAttrNodeFactory.createMdxJsxAttributeNode(key, val);
    });
    return parsedAttrs;
};
