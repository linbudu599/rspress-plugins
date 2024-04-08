import path from 'node:path';

import { CodeBlock2GlobalComponentPluginFactory } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import type { MermaidConfig } from 'mermaid';
import type { MermaidRendererProps } from './components/MermaidRender';

interface RspressPluginMermaidOptions {
  mermaidConfig?: MermaidConfig;
}

export default function rspressPluginMermaid(
  options: RspressPluginMermaidOptions = {},
): RspressPlugin {
  const { mermaidConfig = {} } = options;

  return new CodeBlock2GlobalComponentPluginFactory({
    name: 'rspress-plugin-mermaid',
    transformers: [
      {
        lang: 'mermaid',
        componentPath: path.join(__dirname, './components/MermaidRender.tsx'),
        childrenProvider() {
          return [];
        },
        propsProvider(code) {
          return {
            code,
            config: mermaidConfig,
          } satisfies MermaidRendererProps;
        },
      },
    ],
  }).instantiate();
}
