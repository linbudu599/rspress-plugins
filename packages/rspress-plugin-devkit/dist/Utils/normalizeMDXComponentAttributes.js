export const normalizeMDXComponentAttrs = (attributes) => {
    var _a;
    const parsedAttrs = (_a = Object.entries(attributes)) === null || _a === void 0 ? void 0 : _a.map(([key, val]) => {
        return {
            type: 'mdxJsxAttribute',
            name: key,
            value: val,
        };
    });
    return parsedAttrs;
};
