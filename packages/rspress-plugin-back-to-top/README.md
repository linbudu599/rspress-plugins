# rspress-plugin-back-to-top

Rspress plugin to add a back-to-top button when scrolling reaches a certain distance.

## Usage

```bash
npm i rspress-plugin-back-to-top
pnpm add rspress-plugin-back-to-top
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import back2Top from 'rspress-plugin-back-to-top';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [back2Top()],
});
```

## Configure

### threshold

Distance from the top of the page to show the back-to-top button.

- Type: `number`
- Default: `300`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import back2Top from 'rspress-plugin-back-to-top';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [back2Top({
    threshold: 500,
  })],
});
```
