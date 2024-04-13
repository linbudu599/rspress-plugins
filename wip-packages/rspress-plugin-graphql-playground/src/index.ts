import path from 'node:path';

import {
  PresetConfigMutator,
  RemarkCodeBlockToGlobalComponentPluginFactory,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPluginGraphQLPlayground(): RspressPlugin {
  const remarkInsertGraphQLPlayground =
    new RemarkCodeBlockToGlobalComponentPluginFactory({
      components: [
        {
          lang: 'graphql',
          componentPath: path.join(componentsPath, './GraphQLPlayground.tsx'),
        },
      ],
    });

  return {
    name: 'rspress-plugin-graphql-playground',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [remarkInsertGraphQLPlayground.remarkPlugin],
      globalComponents: remarkInsertGraphQLPlayground.mdxComponents,
    },
    builderConfig: remarkInsertGraphQLPlayground.builderConfig,
  };
}
