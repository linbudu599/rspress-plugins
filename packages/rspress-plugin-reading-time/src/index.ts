import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkInsertComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginReadingTime(): RspressPlugin {
  const remarkInsertReadingTime = new RemarkInsertComponentPluginFactory({
    components: [
      {
        position: 'pre',
        componentPath: path.join(componentsPath, './ReadingTime.tsx'),
      },
    ],
  });

  return {
    name: 'rspress-plugin-reading-time',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkInsertReadingTime.remarkPlugin],
      globalComponents: remarkInsertReadingTime.mdxComponents,
    },
    builderConfig: remarkInsertReadingTime.builderConfig,
  };
}
