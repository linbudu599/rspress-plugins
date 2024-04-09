import path from 'path';
import { RemarkPluginFactoryBase } from './FactoryBase';
import { unistVisit } from '../Exports/Unist';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
export class RemarkCodeBlockToGlobalComponentPluginFactory extends RemarkPluginFactoryBase {
    constructor(options) {
        super(options);
        this.options = options;
    }
    get remarkPlugin() {
        return () => (tree, vfile) => {
            unistVisit(tree, 'code', (code, index = 0, parent) => {
                this.options.components.forEach(({ lang, componentPath, propsProvider, childrenProvider }) => {
                    if (code.lang === lang) {
                        parent.children.splice(index, 1, 
                        // @ts-expect-error
                        MdxJsxElementFactory.createMdxJsxFlowElementNode(code.value, {
                            componentName: path.basename(componentPath, '.tsx'),
                            propsProvider,
                            childrenProvider,
                        }));
                    }
                });
            });
        };
    }
}
