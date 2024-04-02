import * as path from 'path';
import { defineConfig } from 'rspress/config';
import supersub from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x SuperSub Example',
  plugins: [supersub()],
});
