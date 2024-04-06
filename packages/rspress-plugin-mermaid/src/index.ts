import path from 'node:path';

import {
  CodeBlock2GlobalComponentPluginFactory,
  remarkParseDirective,
  remarkTransformDirective,
  type RemarkTransformDirectiveOptions,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginMermaid(): RspressPlugin {
  return new CodeBlock2GlobalComponentPluginFactory({
    name: 'rspress-plugin-mermaid',
    transformers: [
      {
        lang: 'mermaid',
        componentPath: path.join(componentsPath, 'MermaidRender.tsx'),
      },
    ],
  }).instantiate();
}
