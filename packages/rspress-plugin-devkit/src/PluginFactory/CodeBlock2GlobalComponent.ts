import path from 'node:path';

import merge from 'lodash-es/merge';
import { visit } from 'unist-util-visit';

import type { Plugin } from 'unified';
import type { Root, Content } from 'mdast';

import type { RspressPlugin } from '@rspress/shared';

interface InstantiateOptions {
  name: string;
  transformers: Array<{
    lang: string;
    componentPath: string;
    propsProvider?: (code: string) => Record<string, unknown>;
    childrenProvider?: (code: string) => Content[];
  }>;
}

export class CodeBlock2GlobalComponentPluginFactory {
  constructor(private readonly options: InstantiateOptions) {}

  private createRemarkPlugin(): Plugin<[unknown], Root> {
    return () => (tree, vfile) => {
      visit(tree, 'code', (code, index = 0, parent) => {
        this.options.transformers.forEach(
          ({ lang, componentPath, propsProvider, childrenProvider }) => {
            if (code.lang === lang) {
              // @ts-expect-error
              parent!.children.splice(index, 1, {
                type: 'mdxJsxFlowElement',
                name: path.basename(componentPath, '.tsx'),
                children: childrenProvider?.(code.value) ?? [
                  {
                    type: 'text',
                    value: code.value,
                  },
                ],
                attributes: propsProvider?.(code.value) ?? {},
              });
            }
          },
        );
      });
    };
  }

  private patchConfig: Omit<RspressPlugin, 'name'> = {};

  public patch(input: Omit<RspressPlugin, 'name'>) {
    merge(this.patchConfig, input);
    return this;
  }

  public instantiate(): RspressPlugin {
    return merge<RspressPlugin, Omit<RspressPlugin, 'name'>>(
      {
        name: this.options.name,
        config(config) {
          config.markdown ??= {};
          config.markdown.mdxRs = false;
          return config;
        },
        markdown: {
          remarkPlugins: [this.createRemarkPlugin()],
          globalComponents: this.options.transformers.map(
            ({ componentPath }) => componentPath,
          ),
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
      },
      this.patchConfig,
    );
  }
}
