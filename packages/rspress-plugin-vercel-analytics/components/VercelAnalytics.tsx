import React from 'react';
import va from '@vercel/analytics';

import type { VercelAnalyticsProps } from '../src/typings';

const VercelAnalytics: React.FC<VercelAnalyticsProps> = (props = {}) => {
  React.useLayoutEffect(() => {
    va.inject(props);
  }, []);

  return null;
};

export default VercelAnalytics;
