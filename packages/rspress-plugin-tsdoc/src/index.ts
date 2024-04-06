import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import { PresetConfigMutator } from 'rspress-plugin-devkit';
import { remarkTransformDirectives } from './remark-plugins/transform-directives';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginTransformTypes(): RspressPlugin {
  return {
    name: 'rspress-plugin-transform-types',
    config(config, utils) {
      return new PresetConfigMutator(config, utils).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkTransformDirectives],
    },
  };
}
