import React, { useEffect } from 'react';

import { loadOml2d, type Options as OnMyLive2DOptions } from 'oh-my-live2d';

export interface Live2DWidgetProps extends OnMyLive2DOptions {}

const Live2DWidget: React.FC<Live2DWidgetProps> = (options) => {
  useEffect(() => {
    loadOml2d(options);
  }, []);

  return null;
};

export default Live2DWidget;
