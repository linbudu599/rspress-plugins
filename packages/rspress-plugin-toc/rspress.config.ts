import * as path from 'path';
import { defineConfig } from 'rspress/config';
import toc from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Toc Example',
  plugins: [
    toc({
      useOfficialComponent: false,
    }),
  ],
});
