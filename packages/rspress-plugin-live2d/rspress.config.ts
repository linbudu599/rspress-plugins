import * as path from 'path';
import { defineConfig } from 'rspress/config';
import live2d from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x live2d Example',
  plugins: [live2d()],
});
