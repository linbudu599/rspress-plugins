# rspress-plugin-vercel-analytics ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-vercel-analytics)

为 Rspress 集成 [Vercel Analytics](https://vercel.com/docs/analytics).

## 使用

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

## 配置

查看 [Vercel Analytics](https://vercel.com/docs/analytics/package) 获取详细信息。
