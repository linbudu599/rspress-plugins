# rspress-plugin-toc ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-toc)

Rspress plugin that injects a table of contents into the page.

## Compares to built-in Toc component

Rspress provides a built-in [`<Toc />`](https://rspress.dev/zh/api/client-api/api-components.html#table-of-contents) component that can be used to generate a table of contents. So, what are the situations where you would need this plugin?

- You don't want to import and place components repeatedly for each md/mdx file.
- You want to be able to set the depth of the toc's HEADING, by default the toc component displays up to level 4 HEADING(`h4`) and you want to set it to a smaller or larger value.

The Toc component inserted by this plugin exactly replicates the style of the rspress built-in Toc component, plus the component is placed after the h1 node.

## Usage

```bash
npm i rspress-plugin-toc
pnpm add rspress-plugin-toc
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import toc from 'rspress-plugin-toc';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [toc()],
});
```

## Configure

### depth

Max heading level to display in the table of contents.

- Type: `number`
- Default: `4`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import toc from 'rspress-plugin-toc';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [toc({
    depth: 4,
  })],
});
```
