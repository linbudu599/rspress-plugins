import path from 'node:path';

import { remarkTransformMermaidCodeBlock } from './remark-plugins/transform-mermaid-code-block';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginMermaid(): RspressPlugin {
  return {
    // 插件名称
    name: 'rspress-plugin-mermaid',
    config(config) {
      config.markdown ??= {};
      config.markdown.mdxRs = false;
      return config;
    },
    markdown: {
      remarkPlugins: [remarkTransformMermaidCodeBlock],
      globalComponents: [path.join(componentsPath, 'MermaidRender.tsx')],
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
