import { visit } from 'unist-util-visit';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

interface RemarkTransformFileTreeOptions {}

export const remarkTransformFileTree: Plugin<
  [RemarkTransformFileTreeOptions],
  Root
> = () => {
  return (tree, vfile) => {
    visit(tree, 'code', (code, index = 0, parent) => {
      if (code.lang !== 'tree') return;

      parent!.children.splice(index, 1, {
        // @ts-expect-error
        type: 'mdxJsxFlowElement',
        name: 'FileTreeRender',
        children: [
          {
            type: 'text',
            value: code.value,
          },
        ],
      });
    });
  };
};
