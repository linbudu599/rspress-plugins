import React from 'react';
import va from '@vercel/analytics';

export type InjectOptions = NonNullable<
  NonNullable<Parameters<typeof va.inject>>[0]
>;

export interface VercelAnalyticsProps extends InjectOptions {}

const VercelAnalytics: React.FC<VercelAnalyticsProps> = (props = {}) => {
  React.useLayoutEffect(() => {
    va.inject(props);
  }, []);

  return null;
};

export default VercelAnalytics;
