# rspress-plugin-reading-time ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-reading-time)

在你的文档页面中显示阅读时间的 Rspress 插件。

![sample](image.png)

## 使用

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

## 配置

### getReadingTime

用于计算预估阅读时间的函数，默认使用 [reading-time](https://www.npmjs.com/package/reading-time) 包进行估算。

- Type: `(content: string) => ReadTimeResults`

### defaultLocale

在站点未设置 locales 时，用于阅读时间文本的默认语言，默认使用 `en-US`。

- Type: `string`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import readingTime from 'rspress-plugin-reading-time';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    readingTime({
      defaultLocale: 'zh-CN',
    }),
  ],
});
```
