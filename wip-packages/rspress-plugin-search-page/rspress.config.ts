import * as path from 'path';
import { defineConfig } from 'rspress/config';
import SearchPage from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x SearchPage Example',
  plugins: [SearchPage()],
});
