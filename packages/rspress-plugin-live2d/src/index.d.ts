import type { RspressPlugin } from '@rspress/shared';
import type { Live2DWidgetProps } from './components/Live2DWidget';
export interface RspressPluginLive2dOptions extends Live2DWidgetProps {
}
export default function rspressPluginLive2d(props?: RspressPluginLive2dOptions): RspressPlugin;
