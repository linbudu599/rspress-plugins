import path from 'path';
import { unistVisit } from '../Exports/Unist';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
import { RemarkPluginFactoryBase } from './FactoryBase';
export class RemarkInsertComponentPluginFactory extends RemarkPluginFactoryBase {
    constructor(options) {
        super(options);
        this.options = options;
    }
    get remarkPlugin() {
        return () => (tree, vfile) => {
            unistVisit(tree, (node, index = 0, parent) => {
                var _a, _b;
                if (!((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.components) === null || _b === void 0 ? void 0 : _b.length))
                    return;
                const beforeInsertCount = this.options.components.filter(({ position }) => position === 'pre').length;
                if (node.type !== 'root')
                    return;
                const insertIndexAtPre = 
                // @ts-expect-error
                node.children.findLastIndex((node) => node.type === 'mdxjsEsm') + 1;
                const insertIndexAtPost = node.children.length + beforeInsertCount;
                this.options.components.forEach(({ position, componentPath, propsProvider, childrenProvider }) => {
                    const insertIndex = position === 'pre' ? insertIndexAtPre : insertIndexAtPost;
                    node.children.splice(insertIndex, 0, 
                    // @ts-expect-error
                    MdxJsxElementFactory.createMdxJsxFlowElementNode(null, {
                        componentName: path.basename(componentPath, '.tsx'),
                        propsProvider,
                        childrenProvider,
                    }));
                });
            });
        };
    }
}
