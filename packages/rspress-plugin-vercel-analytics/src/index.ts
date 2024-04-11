import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkCodeBlockToGlobalComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

interface RspressPluginSiteMapOptions {}

export default function rspressPluginSiteMap(
  options: RspressPluginSiteMapOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-sitemap',
  };
}
