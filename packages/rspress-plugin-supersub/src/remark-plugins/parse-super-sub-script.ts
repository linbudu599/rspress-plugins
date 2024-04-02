import { visit } from 'unist-util-visit';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

interface RemarkParseSuperSubScriptOptions {}

export const remarkParseSuperSubScript: Plugin<
  [RemarkParseSuperSubScriptOptions],
  Root
> = () => {
  return (tree, vfile) => {
    visit(tree, 'text', (node, i, parent) => {
      const { value } = node;

      const values = value.split(/\^/);

      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children = values.map((str, i) =>
        i % 2 === 0
          ? {
              type: 'text',
              value: str,
            }
          : {
              type: 'superscript',
              data: {
                hName: 'sup',
              },
              children: [
                {
                  type: 'text',
                  value: str,
                },
              ],
            },
      );

      // @ts-expect-error
      parent!.children?.splice(i!, 1, ...children);
    });

    // Subscript
    visit<Root, 'text'>(tree, (node, i, parent) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node;

      // eslint-disable-next-line no-useless-escape
      const values = value.split(/\&/);

      if (values.length === 1 || values.length % 2 === 0) {
        return;
      }

      const children = values.map((str, i) =>
        i % 2 === 0
          ? {
              type: 'text',
              value: str,
            }
          : {
              type: 'subscript',
              data: {
                hName: 'sub',
              },
              children: [
                {
                  type: 'text',
                  value: str,
                },
              ],
            },
      );

      // @ts-expect-error
      parent!.children.splice(i!, 1, ...children);
    });
  };
};
