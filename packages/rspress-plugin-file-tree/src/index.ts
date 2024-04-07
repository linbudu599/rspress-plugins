import path from 'node:path';

import { CodeBlock2GlobalComponentPluginFactory } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import { parseInput } from './parser';

export default function rspressPluginMermaid(): RspressPlugin {
  return new CodeBlock2GlobalComponentPluginFactory({
    name: 'rspress-plugin-mermaid',
    transformers: [
      {
        lang: 'tree',
        childrenProvider() {
          return [
            {
              type: 'text',
              value: '',
            },
          ];
        },
        propsProvider(code) {
          return {
            value: JSON.stringify(parseInput(code)),
          };
        },
        componentPath: path.join(
          __dirname,
          './components/Tree/FileTreeRender.tsx',
        ),
      },
    ],
  }).instantiate();
}
