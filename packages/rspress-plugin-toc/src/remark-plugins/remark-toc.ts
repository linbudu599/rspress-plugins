import {
  MDASTNodeFactory,
  MdxJsxElementFactory,
  type RemarkPluginFactory,
} from 'rspress-plugin-devkit';

import { toc } from 'mdast-util-toc';

import type { TocOptions } from '../shared';

export interface RemarkTocOptions extends TocOptions {}

export default function remarkTocPluginFactory(): RemarkPluginFactory<RemarkTocOptions> {
  return (options) => {
    const {
      maxDepth = 4,
      tight = true,
      ordered = true,
      tocHeading = 'Table of Contents',
      useOfficialComponent,
      skip,
    } = options;

    return (tree, vfile) => {
      if (useOfficialComponent) {
        const firstH1Heading = tree.children.findIndex((c) => {
          return c.type === 'heading' && c.depth === 1;
        });

        tree.children.splice(
          firstH1Heading + 1,
          0,
          MDASTNodeFactory.createHeadingNode(tocHeading, 2),
          // @ts-expect-error
          MdxJsxElementFactory.createMdxJsxFlowElementNode({}, 'Toc'),
        );

        tree.children.unshift(
          // TODO: typing extends
          // @ts-expect-error
          MdxJsxElementFactory.createMdxJsxImportStatementNode(
            ['Toc'],
            'rspress/theme',
          ),
        );

        return;
      }

      const result = toc(tree, {
        maxDepth,
        tight,
        ordered,
        skip,
        heading: tocHeading,
      });

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
            componentName: 'TocList',
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
