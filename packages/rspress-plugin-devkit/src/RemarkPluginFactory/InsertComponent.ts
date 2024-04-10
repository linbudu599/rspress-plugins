import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
import { ComponentRegistration, RemarkPluginFactoryBase } from './FactoryBase';
import { getComponentName } from '../Utils/registerComponent';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

type InsertPosition = 'pre' | 'post' | 'after-first-heading';

interface ComponentInsertDescriptor extends ComponentRegistration<void> {
  position: InsertPosition;
}

interface Options {
  components: ComponentInsertDescriptor[];
}

export class RemarkInsertComponentPluginFactory extends RemarkPluginFactoryBase {
  constructor(public readonly options: Options) {
    super(options);
  }

  public get remarkPlugin(): Plugin<[unknown], Root> {
    const components = this.options?.components ?? [];

    return () => (tree, vfile) => {
      if (!components?.length) return;

      function getInsertIndex(position: InsertPosition) {
        if (!tree.children?.length) return 0;

        switch (position) {
          case 'pre':
            return (
              // @ts-expect-error
              tree.children.findLastIndex((node) => node.type === 'mdxjsEsm') +
              1
            );
          case 'post':
            const beforeInsertCount = components.filter(
              ({ position }) =>
                position === 'pre' || position === 'after-first-heading',
            ).length;

            const insertIndexAtPost = tree.children.length + beforeInsertCount;

            return insertIndexAtPost;
          case 'after-first-heading':
            const firstHeadingIndex = tree.children.findIndex(
              (node) => node.type === 'heading',
            );

            return firstHeadingIndex + 1;
          default:
            throw new Error(`Unknown insert position: ${position}`);
        }
      }

      components.forEach(
        ({ position, componentPath, propsProvider, childrenProvider }) => {
          const insertIndex = getInsertIndex(position);

          tree.children.splice(
            insertIndex,
            0,
            // @ts-expect-error
            MdxJsxElementFactory.createMdxJsxFlowElementNode<any>(
              {},
              {
                componentName: getComponentName(componentPath),
                propsProvider,
                childrenProvider,
              },
            ),
          );
        },
      );
    };
  }
}
