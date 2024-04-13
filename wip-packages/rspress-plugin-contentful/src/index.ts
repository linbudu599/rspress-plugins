import path from 'node:path';

import * as contentful from 'contentful';
import contentfulManagement from 'contentful-management';

import { config } from 'dotenv';

config();

import type { RspressPlugin } from '@rspress/shared';
import { PresetConfigMutator } from 'rspress-plugin-devkit';

export const componentsPath = path.join(__dirname, './components');

export default function rspressPlugincontentful(): RspressPlugin {
  return {
    name: 'rspress-plugin-contentful',
    config(config) {
      return new PresetConfigMutator(config).toConfig();
    },
    async addPages(config, isProd) {
      const { CONTENTFUL_SPACE_ID, CONTENTFUL_DELIVERY_AT } = process.env;

      const client = contentful.createClient({
        space: <string>CONTENTFUL_SPACE_ID,
        accessToken: <string>CONTENTFUL_DELIVERY_AT,
      });

      const entries = await client.getEntries();

      return entries.items.map((entry) => {
        return {
          routePath: entry.sys.id,
          // TODO: RICHTEXT TO MARKDOWN
          // content: entry.fields['body'],
          content: '# Content from contentful!',
        };
      });
    },
  };
}
