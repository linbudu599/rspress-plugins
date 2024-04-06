import path from 'node:path';

import remarkMDC from 'remark-mdc';
import {
  PresetConfigMutator,
  remarkParseDirective,
  remarkTransformDirective,
  type RemarkTransformDirectiveOptions,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginSupersub(): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    config(config, utils) {
      return new PresetConfigMutator(config, utils).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [
        remarkParseDirective,
        [
          remarkTransformDirective,
          <RemarkTransformDirectiveOptions>{
            directive: 'xxx',
            transformer: {
              type: 'globalComponent',
              getComponentName: (meta) => {
                return 'Fallback';
              },
            },
          },
        ],
      ],
      globalComponents: [path.join(componentsPath, './Fallback.tsx')],
    },
  };
}
