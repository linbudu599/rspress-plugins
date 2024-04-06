import * as path from 'path';
import { defineConfig } from 'rspress/config';
import transformTypes from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x TransformTypes Example',
  plugins: [transformTypes()],
});
