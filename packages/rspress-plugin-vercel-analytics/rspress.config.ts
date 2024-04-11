import * as path from 'path';
import { defineConfig } from 'rspress/config';
import vercelAnalytics from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Vercel Analytics Example',
  plugins: [vercelAnalytics()],
});
