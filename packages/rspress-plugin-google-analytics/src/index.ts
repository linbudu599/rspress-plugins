import { ensureArray, type MaybeArray } from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';
import path from 'path';

interface RspressPluginSiteMapOptions {
  id: MaybeArray<string>;
  anonymizeIP?: boolean;
}

export default function rspressPluginGoogleAnalytics(
  options: RspressPluginSiteMapOptions,
): RspressPlugin {
  const { id = [], anonymizeIP = false } = options;

  const idList = ensureArray(id);

  if (!idList.length) {
    throw new Error(
      'Provide at least one Google Analytics tracking ID to use rspress-plugin-google-analytics',
    );
  }

  const [firsrId] = idList;

  return {
    name: 'rspress-plugin-google-analytics',
    config(config, utils, isProd) {
      return config;
    },
    globalUIComponents: [
      path.resolve(__dirname, '../components/SendGTagEvent.tsx'),
    ],
    builderConfig: {
      html: {
        tags: [
          {
            tag: 'link',
            head: true,
            append: false,
            attrs: {
              rel: 'preconnect',
              href: 'https://www.google-analytics.com',
            },
          },
          {
            tag: 'link',
            head: true,
            append: false,
            attrs: {
              rel: 'preconnect',
              href: 'https://www.googletagmanager.com',
            },
          },
          {
            tag: 'script',
            head: true,
            append: false,
            attrs: {
              async: true,
              // https://developers.google.com/tag-platform/gtagjs/install#add-products
              src: `https://www.googletagmanager.com/gtag/js?id=${firsrId}`,
            },
          },
          {
            tag: 'script',
            head: true,
            append: false,
            children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
              ${idList
                .map(
                  (id) => `
gtag('config', '${id}', {
  anonymize_ip: ${anonymizeIP},
});`,
                )
                .join('\n')}
            `,
          },
        ],
      },
    },
  };
}
