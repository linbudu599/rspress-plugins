import path from 'node:path';

import { PresetConfigMutator } from 'rspress-plugin-devkit';

import remarkTocPluginFactory, {
  type RemarkTocOptions,
} from './remark-plugins/remark-toc';

import type { RspressPlugin } from '@rspress/shared';
import type { TocOptions } from './shared';

export interface RspressPluginTocOptions extends TocOptions {}

export default function rspressPluginToc(
  options: RspressPluginTocOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-toc',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [
        [remarkTocPluginFactory(), options satisfies RemarkTocOptions],
      ],
      globalComponents: [path.join(__dirname, './components', './TocList.tsx')],
    },
  };
}
