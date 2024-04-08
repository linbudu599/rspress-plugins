import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkCodeBlockToGlobalComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import { parseInput } from './parser';

interface RspressPluginFileTreeOptions {}

export default function rspressPluginFileTree(
  options: RspressPluginFileTreeOptions = {},
): RspressPlugin {
  const remarkFileTree = new RemarkCodeBlockToGlobalComponentPluginFactory({
    components: [
      {
        lang: 'tree',
        componentPath: path.join(
          __dirname,
          './components/Tree/FileTreeRender.tsx',
        ),
        childrenProvider() {
          return [];
        },
        propsProvider(code) {
          return {
            // tree: parseInput(code),
          };
        },
      },
    ],
  });

  return {
    name: 'rspress-plugin-file-tree',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkFileTree.remarkPlugin],
      globalComponents: remarkFileTree.mdxComponents,
    },
    builderConfig: remarkFileTree.builderConfig,
  };
}
