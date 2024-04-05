import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import { PresetConfigMutator } from 'rspress-plugin-devkit';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginObsidian(): RspressPlugin {
  return {
    name: 'rspress-plugin-obsidian',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    markdown: {},
  };
}
