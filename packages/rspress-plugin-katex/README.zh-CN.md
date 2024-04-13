# rspress-plugin-katex ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-katex)

为 Rspress 支持基于 [KaTeX](https://katex.org/) 渲染的数学公式支持。

````markdown
```math
% \f is defined as #1f(#2) using the macro
\f\relax{x} = \int_{-\infty}^\infty
    \f\hat\xi\,e^{2 \pi i \xi x}
    \,d\xi
```
````

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import mermaid from './src';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    mermaid({
      macros: {
        '\\f': '#1f(#2)',
      },
    }),
  ],
});
```

<div align="center">
  <img src="./image.png" alt="sample" width="400" height="150" />
</div>

## 使用

```bash
npm i rspress-plugin-katex
pnpm add rspress-plugin-katex
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import katex from 'rspress-plugin-katex';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [katex()],
});
```

## 配置

查看 [KaTeX documentation](https://katex.org/docs/options.html) 了解更多细节。
