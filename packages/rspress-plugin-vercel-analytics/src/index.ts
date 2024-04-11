import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import type { VercelAnalyticsProps } from './VercelAnalytics';

interface RspressPluginVercelAnalyticsOptions extends VercelAnalyticsProps {}

export default function rspressPluginVercelAnalytics(
  options: RspressPluginVercelAnalyticsOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-vercel-analytics',
    config(config, utils, isProd) {
      return config;
    },
    globalUIComponents: [
      [
        path.join(__dirname, 'VercelAnalytics.tsx'),
        {
          mode:
            process.env.NODE_ENV === 'production'
              ? 'production'
              : 'development',
          ...options,
        } satisfies VercelAnalyticsProps,
      ],
    ],
  };
}
