import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import { PresetConfigMutator } from 'rspress-plugin-devkit';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginSearchPage(): RspressPlugin {
  return {
    name: 'rspress-plugin-search-page',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    addPages(config, isProd) {
      return [
        {
          routePath: '/search',
          filepath: path.join(__dirname, './SearchPage', 'index.tsx'),
        },
      ];
    },
    async routeGenerated(routes, isProd) {
      console.log('routes: ', routes);
      // 这里可以拿到 routes 数组，执行一些操作
    },
  };
}
