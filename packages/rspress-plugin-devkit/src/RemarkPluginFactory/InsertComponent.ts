import { unistVisit } from '../Exports/Unist';
import { MdxJsxElementFactory } from '../NodeFactory/MdxJsxElementFactory';
import { ComponentRegistration, RemarkPluginFactoryBase } from './FactoryBase';

import type { Plugin } from 'unified';
import type { Root } from 'mdast';

interface ComponentInsertDescriptor extends ComponentRegistration {
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
        this.options.components.forEach(
          ({ position, componentPath, propsProvider, childrenProvider }) => {
            const insertIndex =
              position === 'pre' ? tree.children.unshift : tree.children.push;

            insertIndex(
              // @ts-expect-error
              MdxJsxElementFactory.createMdxJsxFlowElementNode(null, {
                componentPath,
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
