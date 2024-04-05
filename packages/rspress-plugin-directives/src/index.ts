import path from 'node:path';

import remarkMDC from 'remark-mdc';
import { PresetConfigMutator } from 'rspress-plugin-devkit';
import { remarkParseDirectives } from './remark-plugins/container-syntax';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginSupersub(): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    config(config, utils) {
      return new PresetConfigMutator(config, utils).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkMDC, remarkParseDirectives],
      globalComponents: [path.join(componentsPath, './Fallback.tsx')],
    },
  };
}
