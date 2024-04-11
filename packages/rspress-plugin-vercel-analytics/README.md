# rspress-plugin-vercel-analytics ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-vercel-analytics)

Rspress plugin for [Vercel Analytics](https://vercel.com/docs/analytics).

## Usage

```bash
npm i rspress-plugin-vercel-analytics
pnpm add rspress-plugin-vercel-analytics
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import vercelAnalytics from 'rspress-plugin-vercel-analytics';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [vercelAnalytics()],
});
```

## Configure

See [Vercel Analytics](https://vercel.com/docs/analytics/package) for more details.
