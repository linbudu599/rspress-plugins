import path from 'node:path';

import { CodeBlock2GlobalComponentPluginFactory } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

const files = [
  {
    type: 'directory',
    name: 'bin',
    files: [
      {
        type: 'file',
        name: 'cs.js',
      },
    ],
  },
  {
    type: 'directory',
    name: 'docs',
    files: [
      {
        type: 'file',
        name: 'controllers.md',
      },
      {
        type: 'file',
        name: 'es6.md',
      },
      {
        type: 'file',
        name: 'production.md',
      },
      {
        type: 'file',
        name: 'views.md',
      },
    ],
  },
] as any;

export default function rspressPluginMermaid(): RspressPlugin {
  return new CodeBlock2GlobalComponentPluginFactory({
    name: 'rspress-plugin-mermaid',
    transformers: [
      {
        lang: 'tree',
        childrenProvider: (text) => {
          return [
            {
              type: 'text',
              value: JSON.stringify(files),
            },
          ];
        },
        componentPath: path.join(componentsPath, 'FileTreeRender.tsx'),
      },
    ],
  }).instantiate();
}
