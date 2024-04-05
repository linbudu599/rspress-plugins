import * as path from 'path';
import { defineConfig } from 'rspress/config';
import container from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Container Directive Example',
  plugins: [container()],
});
