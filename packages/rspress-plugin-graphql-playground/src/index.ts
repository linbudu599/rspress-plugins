import path from 'node:path';

import { CodeBlock2GlobalComponentPluginFactory } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginGraphQL(): RspressPlugin {
  return new CodeBlock2GlobalComponentPluginFactory({
    name: 'rspress-plugin-graphql-playground',
    transformers: [
      {
        lang: 'graphql',
        componentPath: path.join(componentsPath, 'GraphQLPlayground.tsx'),
      },
    ],
  }).instantiate();
}
