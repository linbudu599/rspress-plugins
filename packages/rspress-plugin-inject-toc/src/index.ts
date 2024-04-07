import path from 'node:path';

import { PresetConfigMutator } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import type { Back2TopProps } from './components/Back2Top';

export const componentsPath = path.join(__dirname, './components');

export interface RspressPluginBack2TopOptions extends Back2TopProps {}

export default function rspressPluginBack2Top(
  options: RspressPluginBack2TopOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-back-to-top',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    globalUIComponents: [
      [
        path.join(componentsPath, 'Back2Top.tsx'),
        options satisfies Back2TopProps,
      ],
    ],
  };
}
