# rspress-plugin-google-analytics ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-google-analytics)

为 Rspress 集成 [Google Analytics](https://analytics.google.com/)。

## 使用

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

## 配置

### id

Google Analytics 的跟踪 ID。

- Type: `string | string[]`
- Required

### anonymizeIp

启用 [匿名 IP 地址](https://developers.google.com/analytics/devguides/collection/gtagjs/ip-anonymization)。

- Type: `boolean`
- Default: `false`
