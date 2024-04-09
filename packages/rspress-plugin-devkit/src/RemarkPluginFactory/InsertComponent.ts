import path from 'path';

import { unistVisit } from '../Exports/Unist';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
import { ComponentRegistration, RemarkPluginFactoryBase } from './FactoryBase';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

interface ComponentInsertDescriptor extends ComponentRegistration<void> {
  position: 'pre' | 'post';
}

interface Options {
  components: ComponentInsertDescriptor[];
}

export class RemarkInsertComponentPluginFactory extends RemarkPluginFactoryBase {
  constructor(public readonly options: Options) {
    super(options);
  }

  public get remarkPlugin(): Plugin<[unknown], Root> {
    return () => (tree, vfile) => {
      unistVisit(tree, (node, index = 0, parent) => {
        if (!this.options?.components?.length) return;

        const beforeInsertCount = this.options.components.filter(
          ({ position }) => position === 'pre',
        ).length;

        if (node.type !== 'root') return;

        const insertIndexAtPre =
          // @ts-expect-error
          node.children.findLastIndex((node) => node.type === 'mdxjsEsm') + 1;

        const insertIndexAtPost = node.children.length + beforeInsertCount;

        this.options.components.forEach(
          ({ position, componentPath, propsProvider, childrenProvider }) => {
            const insertIndex =
              position === 'pre' ? insertIndexAtPre : insertIndexAtPost;

            node.children.splice(
              insertIndex,
              0,
              // @ts-expect-error
              MdxJsxElementFactory.createMdxJsxFlowElementNode(null, {
                componentName: path.basename(componentPath, '.tsx'),
                propsProvider,
                childrenProvider,
              }),
            );
          },
        );
      });
    };
  }
}
