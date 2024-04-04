import * as path from 'path';
import { defineConfig } from 'rspress/config';
import contentful from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Contentful Example',
  plugins: [contentful()],
});
