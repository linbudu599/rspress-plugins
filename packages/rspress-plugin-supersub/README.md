# rspress-plugin-supersub ![NPM Version](https://img.shields.io/npm/v/rspress-plugin-supersub)

Rspress plugin to add superscript(`<super></super>`) and subscript(`<sub></sub>`) support.

**NOTE: The common subscript syntax `~` conflicts with the delete syntax(`<del></del>`), which is more commonly used, so this plugin uses `_` as the subscript syntax, and you can also modify the superscript and subscript through configuration.**

<div align="center">
  <img src="./image.png" alt="sample" width="600" height="210" />
</div>

## Usage

```bash
npm i rspress-plugin-supersub
pnpm add rspress-plugin-supersub
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import supersub from 'rspress-plugin-supersub';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [supersub()],
});
```

## Configure

### superSyntax

Define the syntax for superscript.

- Type: `string`
- Default: `^` (matching `^sup^`)

### subSyntax

Define the syntax for subscript.

- Type: `string`
- Default: `_` (matching `_sub_`)
