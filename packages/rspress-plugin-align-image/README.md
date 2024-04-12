# rspress-plugin-align-image ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-align-image)

Rspress plugin to align images in markdown.

This plugin works by wrapping images in a div element with a class that aligns the image.

## Usage

```bash
npm i rspress-plugin-align-image
pnpm add rspress-plugin-align-image
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import alignImage from 'rspress-plugin-align-image';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    alignImage(),
  ],
});
```

## Configure

### justify

Align the image to the left, right or center.

- Type: `'left' | 'right' | 'center'`
- Default: `'center'`

### containerClassNames

Addtional class names to add to the container div element.

- Type: `string[]`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import alignImage from 'rspress-plugin-align-image';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    alignImage({
      justify: 'left',
      containerClassNames: ['my-class'],
    }),
  ],
});
```

The configuration above will align the image to the left and add the class `my-class` to the container div element:

```html
<div class="my-4 flex flex-row justify-start my-class">
  <img src="image.jpg" />
</div>
```