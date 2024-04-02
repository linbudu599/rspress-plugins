import path from 'node:path';

import { remarkTransformFileTree } from './remark-plugins/transform-file-tree';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginFileTree(): RspressPlugin {
  return {
    name: 'rspress-plugin-file-tree',
    config(config) {
      config.markdown ??= {};
      config.markdown.mdxRs = false;
      return config;
    },
    markdown: {
      remarkPlugins: [remarkTransformFileTree],
      globalComponents: [path.join(componentsPath, 'FileTreeRender.tsx')],
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
  };
}
