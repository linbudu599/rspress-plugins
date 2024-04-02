import { visit } from 'unist-util-visit';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

interface RemarkTransformMermaidCodeBlockOptions {}

export const remarkTransformMermaidCodeBlock: Plugin<
  [RemarkTransformMermaidCodeBlockOptions],
  Root
> = () => {
  return (tree, vfile) => {
    visit(tree, 'code', (code, index = 0, parent) => {
      if (code.lang !== 'mermaid') return;

      parent!.children.splice(index, 1, {
        // @ts-expect-error
        type: 'mdxJsxFlowElement',
        name: 'MermaidRender',
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
