import { expect, test } from 'vitest';

import { parseInput } from '../src/parser';

import {
  normalTreeInput,
  withCommentTreeInput,
  withSpacesTreeInput,
} from './fixtures';

test('Should parse normal input', () => {
  expect(parseInput(normalTreeInput)).toMatchInlineSnapshot(`
    [
      {
        "extra": "",
        "name": "rspress.config.ts",
        "type": "file",
      },
      {
        "extra": "",
        "files": [
          {
            "extra": "",
            "files": [
              {
                "extra": "",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "extra": "",
                "files": [
                  {
                    "extra": "",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "name": "Tree",
                "type": "directory",
              },
              {
                "extra": "",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "extra": "",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "name": "components",
            "type": "directory",
          },
          {
            "extra": "",
            "name": "index.ts",
            "type": "file",
          },
          {
            "extra": "",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "name": "src",
        "type": "directory",
      },
      {
        "extra": "",
        "name": "tsconfig.json",
        "type": "file",
      },
    ]
  `);
});

test('Should parse input with comments', () => {
  expect(parseInput(withCommentTreeInput)).toMatchInlineSnapshot(`
    [
      {
        "extra": "Rspress config",
        "name": "rspress.config.ts",
        "type": "file",
      },
      {
        "extra": "",
        "files": [
          {
            "extra": "Shared components",
            "files": [
              {
                "extra": "The file tree render entry",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "extra": "",
                "files": [
                  {
                    "extra": "",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "name": "Tree",
                "type": "directory",
              },
              {
                "extra": "",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "extra": "",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "name": "components",
            "type": "directory",
          },
          {
            "extra": "",
            "name": "index.ts",
            "type": "file",
          },
          {
            "extra": "Parse string input to tree structure",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "name": "src",
        "type": "directory",
      },
      {
        "extra": "",
        "name": "tsconfig.json",
        "type": "file",
      },
    ]
  `);
});

test('Should parse input with spaces', () => {
  expect(parseInput(withSpacesTreeInput)).toMatchInlineSnapshot(`
    [
      {
        "extra": "Rspress config",
        "name": "-1. rspress.config.ts",
        "type": "file",
      },
      {
        "extra": "",
        "files": [
          {
            "extra": "Shared components",
            "files": [
              {
                "extra": "The file tree render entry",
                "name": "FileTreeRender.tsx",
                "type": "file",
              },
              {
                "extra": "",
                "files": [
                  {
                    "extra": "",
                    "name": "Expand.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "FileIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "Tree.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeContext.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFile.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolder.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeFolderIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeIndents.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "TreeStatusIcon.tsx",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.less",
                    "type": "file",
                  },
                  {
                    "extra": "",
                    "name": "index.tsx",
                    "type": "file",
                  },
                ],
                "name": "Tree",
                "type": "directory",
              },
              {
                "extra": "",
                "name": "helpers.ts",
                "type": "file",
              },
              {
                "extra": "",
                "name": "presets.ts",
                "type": "file",
              },
            ],
            "name": "components",
            "type": "directory",
          },
          {
            "extra": "",
            "name": "index.ts",
            "type": "file",
          },
          {
            "extra": "Parse string input to tree structure",
            "name": "parser.ts",
            "type": "file",
          },
        ],
        "name": "0. src",
        "type": "directory",
      },
      {
        "extra": "",
        "name": "1. tsconfig.json",
        "type": "file",
      },
    ]
  `);
});
