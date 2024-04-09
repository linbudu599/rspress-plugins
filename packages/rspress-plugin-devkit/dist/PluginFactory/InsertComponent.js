import merge from 'lodash-es/merge';
import { PresetConfigMutator } from '../ConfigMutator';
import { unistVisit } from '../Exports/Unist';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
export class InsertComponentPluginFactory {
    constructor(options) {
        this.options = options;
        this.patchConfig = {};
    }
    createRemarkPlugin() {
        return () => (tree, vfile) => {
            unistVisit(tree, (node, index = 0, parent) => {
                this.options.components.forEach(({ position, componentPath, propsProvider, childrenProvider }) => {
                    const insertIndex = position === 'pre' ? tree.children.unshift : tree.children.push;
                    insertIndex(
                    // @ts-expect-error
                    MdxJsxElementFactory.createMdxJsxFlowElementNode(null, {
                        componentPath,
                        propsProvider,
                        childrenProvider,
                    }));
                });
            });
        };
    }
    patch(input) {
        merge(this.patchConfig, input);
        return this;
    }
    instantiate() {
        return merge({
            name: this.options.name,
            config(config) {
                return new PresetConfigMutator(config).disableMdxRs().toConfig();
            },
            markdown: {
                remarkPlugins: [this.createRemarkPlugin()],
                globalComponents: this.options.components.map(({ componentPath }) => componentPath),
            },
            builderConfig: {
                tools: {
                    bundlerChain(chain) {
                        chain.module
                            .rule('Raw')
                            .resourceQuery(/raw/)
                            .type('asset/source')
                            .end();
                        chain.resolve.extensions.prepend('.md').prepend('.mdx');
                    },
                },
            },
        }, this.patchConfig);
    }
}
