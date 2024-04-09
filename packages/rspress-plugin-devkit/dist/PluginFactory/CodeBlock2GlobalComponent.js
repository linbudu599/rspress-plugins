import merge from 'lodash-es/merge';
import { visit } from 'unist-util-visit';
import { PresetConfigMutator } from '../ConfigMutator';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
export class CodeBlock2GlobalComponentPluginFactory {
    constructor(options) {
        this.options = options;
        this.patchConfig = {};
    }
    createRemarkPlugin() {
        return () => (tree, vfile) => {
            visit(tree, 'code', (code, index = 0, parent) => {
                this.options.transformers.forEach(({ lang, componentPath, propsProvider, childrenProvider }) => {
                    if (code.lang === lang) {
                        parent.children.splice(index, 1, 
                        // @ts-expect-error
                        MdxJsxElementFactory.createMdxJsxFlowElementNode(code.value, {
                            componentPath,
                            propsProvider,
                            childrenProvider,
                        }));
                    }
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
                globalComponents: this.options.transformers.map(({ componentPath }) => componentPath),
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
