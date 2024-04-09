import fs from 'fs';
import {
  MdxJsxElementFactory,
  type MarkPartial,
  type RemarkPluginFactory,
} from 'rspress-plugin-devkit';

import { toc } from 'mdast-util-toc';

import type { TocOptions } from '../shared';

export interface RemarkTocOptions
  extends MarkPartial<Required<TocOptions>, 'skip'> {}

export default function remarkTocPluginFactory(): RemarkPluginFactory<RemarkTocOptions> {
  return (options) => {
    const {
      maxDepth = 4,
      tight = true,
      ordered = true,
      tocHeading = true,
      skip,
    } = options;

    return (tree, vfile) => {
      const tocHeadingText =
        typeof tocHeading === 'string' ? tocHeading : 'Table of Contents';

      if (tocHeading !== false) {
        const firstH1Heading = tree.children.findIndex((c) => {
          return c.type === 'heading' && c.depth === 1;
        });

        tree.children.splice(firstH1Heading + 1, 0, {
          type: 'heading',
          depth: 2,
          children: [
            {
              type: 'text',
              value: tocHeadingText,
            },
          ],
        });
      }

      const result = toc(tree, {
        maxDepth,
        tight,
        ordered,
        skip,
        heading: tocHeadingText,
      });

      fs.writeFileSync('toc.json', JSON.stringify(result, null, 2));

      if (
        result.endIndex === undefined ||
        result.endIndex === -1 ||
        result.index === undefined ||
        result.index === -1 ||
        !result.map
      ) {
        return;
      }

      // @ts-expect-error
      tree.children = [
        ...tree.children.slice(0, result.index!),
        MdxJsxElementFactory.createMdxJsxFlowElementNode(
          {},
          {
            componentName: 'Toc',
            childrenProvider: () => {
              return result.map ? [result.map] : [];
            },
          },
        ),
        ...tree.children.slice(result.endIndex!),
      ];
    };
  };
}
