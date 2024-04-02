import path from 'node:path';

import { remarkParseSuperSubScript } from './remark-plugins/parse-super-sub-script';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginSupersub(): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    config(config) {
      config.markdown ??= {};
      config.markdown.mdxRs = false;
      return config;
    },
    markdown: {
      // remarkPlugins: [remarkParseSuperSubScript],
    },
  };
}
