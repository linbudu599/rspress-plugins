import va from '@vercel/analytics';

export type InjectOptions = NonNullable<
  NonNullable<Parameters<typeof va.inject>>[0]
>;

export interface VercelAnalyticsProps extends InjectOptions {}
