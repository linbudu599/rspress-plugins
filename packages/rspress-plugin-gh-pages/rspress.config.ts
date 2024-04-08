import * as path from 'path';
import { defineConfig } from 'rspress/config';
import ghpages from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x GHPages Example',
  plugins: [
    ghpages({
      repo: 'https://github.com/linbudu599/rspress-plugins.git',
      branch: 'website',
    }),
  ],
});
