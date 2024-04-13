import * as path from 'path';
import { defineConfig } from 'rspress/config';
import graphql from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x GraphQL Playground Example',
  plugins: [graphql()],
});
