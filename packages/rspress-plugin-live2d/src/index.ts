import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import { PresetConfigMutator } from 'rspress-plugin-devkit';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginLive2d(): RspressPlugin {
  return {
    name: 'rspress-plugin-live2d',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    globalUIComponents: [
      [path.join(componentsPath, 'Live2D', 'index.tsx'), {}],
    ],
  };
}
