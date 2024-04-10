import * as path from 'path';
import { defineConfig } from 'rspress/config';
import readingTime from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x ReadingTime Example',
  plugins: [
    readingTime({
      defaultLocale: 'zh-CN',
    }),
  ],
});
