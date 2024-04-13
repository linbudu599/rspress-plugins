import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkInsertComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import type { GiscusProps } from '@giscus/react';

export interface RspressPluginGiscusOptions extends GiscusProps {}

export default function rspressPluginGiscus(
  props: RspressPluginGiscusOptions,
): RspressPlugin {
  const remarkInsertGiscus = new RemarkInsertComponentPluginFactory({
    components: [
      {
        position: 'post',
        componentPath: path.join(__dirname, './Giscus.tsx'),
        propsProvider: () => props,
      },
    ],
  });

  return {
    name: 'rspress-plugin-comment',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkInsertGiscus.remarkPlugin],
      globalComponents: remarkInsertGiscus.mdxComponents,
    },
    builderConfig: remarkInsertGiscus.builderConfig,
  };
}
