import path from 'node:path';

import ghpages from 'gh-pages';

import { PresetConfigMutator } from 'rspress-plugin-devkit';
import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

const DefaultDocBuildOutput = 'doc_build';

interface RspressPluginGHPagesOptions {}

export default function rspressPluginGHPages(): RspressPlugin {
  return {
    name: 'rspress-plugin-gh-pages',
    config(config) {
      config.base = '/rspress-plugins/';
      return new PresetConfigMutator(config).toConfig();
    },
    async afterBuild(config, isProd) {
      if (!isProd) return;

      const publishDir = config.outDir ?? DefaultDocBuildOutput;

      await ghpages.publish(publishDir, {
        repo: 'https://github.com/linbudu599/rspress-plugins.git',
        branch: 'website',
      });
    },
  };
}
