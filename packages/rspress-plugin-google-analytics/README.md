# rspress-plugin-google-analytics ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-google-analytics)

Rspress gtag plugin.

## Usage

```bash
npm i rspress-plugin-google-analytics
pnpm add rspress-plugin-google-analytics
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import ga from 'rspress-plugin-google-analytics';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    ga({
      id: 'UA-123456789-0',
    }),
  ],
});
```

## Configure

### id

Google Analytics tracking ID.

- Type: `string | string[]`
- Required

### anonymizeIp

[Anonymize IP](https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization) addresses for Google Analytics.

- Type: `boolean`
- Default: `false`
