import * as path from 'path';
import { defineConfig } from 'rspress/config';
import ga from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x GA Example',
  plugins: [
    ga({
      id: 'G-E47ZZ8QFC1',
    }),
  ],
});
