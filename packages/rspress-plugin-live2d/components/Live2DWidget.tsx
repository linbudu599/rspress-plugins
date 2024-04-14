import React, { useEffect } from 'react';

import { loadOml2d } from 'oh-my-live2d';

import type { Live2DWidgetProps } from '../src/typings';

const Live2DWidget: React.FC<Live2DWidgetProps> = (options) => {
  useEffect(() => {
    loadOml2d(options);
  }, []);

  return null;
};

export default Live2DWidget;
