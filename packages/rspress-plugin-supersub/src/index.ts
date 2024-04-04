import path from 'node:path';

import { PresetConfigMutator } from 'rspress-plugin-devkit';
import { remarkParseSuperSubScript } from './remark-plugins/parse-super-sub-script';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginSupersub(): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkParseSuperSubScript],
    },
  };
}
