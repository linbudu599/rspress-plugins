import React from 'react';
import { type Options as OnMyLive2DOptions } from 'oh-my-live2d';
export interface Live2DWidgetProps extends OnMyLive2DOptions {
}
declare const Live2DWidget: React.FC<Live2DWidgetProps>;
export default Live2DWidget;
