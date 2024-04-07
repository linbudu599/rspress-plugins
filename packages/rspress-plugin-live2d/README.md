# rspress-plugin-live2d ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-live2d)

Rspress plugin for live2d, powered by [on-my-live2d](https://oml2d.com/).

![example](image.png)

## Usage

```bash
npm install rspress-plugin-live2d
pnpm install rspress-plugin-live2d
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import live2d from 'rspress-plugin-live2d';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Rspress x Live2d Example',
  plugins: [
    live2d({
      models: [
        {
          path: 'https://model.oml2d.com/HK416-1-normal/model.json',
          position: [0, 60],
          scale: 0.08,
          stageStyle: {
            height: 450,
          },
        },
      ],
    }),
  ],
});
```

## Configure

Find more models on [Model Resources](https://oml2d.com/guide/models.html).
