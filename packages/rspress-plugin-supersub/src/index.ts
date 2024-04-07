import { PresetConfigMutator } from 'rspress-plugin-devkit';
import {
  remarkParseSuperSubScript,
  type RemarkParseSuperSubScriptOptions,
} from './remark-plugins/parse-super-sub-script';

import type { RspressPlugin } from '@rspress/shared';

export interface RspressPluginSupersubOptions
  extends RemarkParseSuperSubScriptOptions {}

export default function rspressPluginSupersub(
  options: RemarkParseSuperSubScriptOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-supersub',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [
        [remarkParseSuperSubScript, <RemarkParseSuperSubScriptOptions>options],
      ],
    },
  };
}
