import * as path from 'path';
import { defineConfig } from 'rspress/config';
import comment from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Comment Example',
  plugins: [
    comment({
      id: 'comments',
      repo: 'linbudu599/rspress-plugins',
      repoId: 'R_kgDOLoSJ5Q',
      mapping: 'pathname',
    }),
  ],
});
