import * as path from 'path';
import { defineConfig } from 'rspress/config';
import directives from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Directives Example',
  plugins: [
    directives({
      directive: 'oops',
      transformer: {
        type: 'globalComponent',
        getComponentName: (meta) => 'Oops',
        componentPath: path.join(__dirname, './components/Oops.tsx'),
      },
    }),
  ],
});
