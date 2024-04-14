import path from 'node:path';

import readingTime, { type ReadTimeResults } from 'reading-time';

import {
  PresetConfigMutator,
  RemarkInsertComponentPluginFactory,
  type WithDefaultLocale,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

export interface RspressPluginReadingTimeOptions extends WithDefaultLocale {
  getReadingTime?: (content: string) => ReadTimeResults;
}

export default function rspressPluginReadingTime(
  options: RspressPluginReadingTimeOptions = {},
): RspressPlugin {
  const { getReadingTime = readingTime, defaultLocale } = options;

  const remarkInsertReadingTime = new RemarkInsertComponentPluginFactory({
    components: [
      {
        position: 'after-first-heading',
        componentPath: path.join(__dirname, '../components/ReadingTime.tsx'),
        propsProvider: () => ({
          defaultLocale,
        }),
      },
    ],
  });

  return {
    name: 'rspress-plugin-reading-time',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    extendPageData(pageData, isProd) {
      const estimatedReadingTime = getReadingTime(pageData.content);
      pageData.readingTimeData = estimatedReadingTime;
    },
    markdown: {
      remarkPlugins: [remarkInsertReadingTime.remarkPlugin],
      globalComponents: remarkInsertReadingTime.mdxComponents,
    },
    builderConfig: remarkInsertReadingTime.builderConfig,
  };
}
