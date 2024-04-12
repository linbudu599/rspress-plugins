# rspress-plugin-file-tree

Rspress plugin that add file tree view support.

Write tree view using code block with language `tree`:

````markdown
```tree
.
├── rspress.config.ts
├── src
│   ├── components
│   │   ├── FileTreeRender.tsx
│   │   ├── Tree
│   │   │   ├── Expand.tsx
│   │   │   ├── FileIcon.tsx
│   │   │   ├── Tree.tsx
│   │   │   ├── TreeContext.tsx
│   │   │   ├── TreeFile.tsx
│   │   │   ├── TreeFolder.tsx
│   │   │   ├── TreeFolderIcon.tsx
│   │   │   ├── TreeIndents.tsx
│   │   │   ├── TreeStatusIcon.tsx
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   ├── helpers.ts
│   │   └── presets.ts
│   ├── index.ts
│   └── parser.ts
└── tsconfig.json
```
````

And it will be rendered as:

<div align="center">
  <img src="./image.png" alt="sample" width="400" height="300" />
</div>

> [!NOTE]
>
> **The renderer component was forked from [Geist UI](https://geist-ui.dev/) which created by [witt](https://github.com/unix), huge thanks to his great work!**

## Usage

```bash
npm i rspress-plugin-file-tree
pnpm add rspress-plugin-file-tree
```

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import fileTree from 'rspress-plugin-file-tree';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [fileTree()],
});
```

## Configure

## initialExpandDepth

Initial expand depth of the tree view.

- Type: `number`
- Default: `0`

```ts
import * as path from 'path';
import { defineConfig } from 'rspress/config';
import fileTree from 'rspress-plugin-file-tree';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  plugins: [
    fileTree({
      initialExpandDepth: Infinity,
    }),
  ],
});
```
