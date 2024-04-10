# rspress-plugin-reading-time ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-reading-time)

Rspress plugin to display reading time for your document pages.

## Usage

```bash
npm i rspress-plugin-reading-time
pnpm add rspress-plugin-reading-time
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [readingTime()],
});
```

## Configure

### getReadingTime

Function to calculate estimated reading time, by default it uses [reading-time](https://www.npmjs.com/package/reading-time) package for estimation.

- Type: `(content: string) => ReadTimeResults`

### defaultLocale

Default locale for reading time, by default it uses `en-US`.

- Type: `string`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [readingTime({
    defaultLocale: 'zh-CN',
  })],
});
```