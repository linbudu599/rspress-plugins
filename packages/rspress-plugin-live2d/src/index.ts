import path from 'node:path';

import type { RspressPlugin } from '@rspress/shared';
import type { Live2DWidgetProps } from './typings';

export interface RspressPluginLive2dOptions extends Live2DWidgetProps {}

export default function rspressPluginLive2d(
  props: RspressPluginLive2dOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-live2d',
    globalUIComponents: [
      [
        path.join(__dirname, '../components/Live2DWidget.tsx'),
        props satisfies Live2DWidgetProps,
      ],
    ],
  };
}
