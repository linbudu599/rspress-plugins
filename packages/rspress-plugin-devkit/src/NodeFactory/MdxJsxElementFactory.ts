import path from 'path';

import { ensureArray } from '../Utils/ensureArray';
import { ESTreeNodeFactory } from './ESTreeNodeFactory';
import { MdxAttrNodeFactory } from './MdxAttrNodeFactory';

import type { Content } from 'mdast';
import type { Dictionary, MaybeArray } from 'util-ts-types';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';

export interface ComponentRegistration<ComponentMetaProvider = any> {
  componentName: string;
  propsProvider?: (input: ComponentMetaProvider) => Dictionary<unknown>;
  childrenProvider?: (input: ComponentMetaProvider) => Content[];
}

export class MdxJsxElementFactory {
  public static createMdxJsxImportStatementNode(
    spcifiers: MaybeArray<string>,
    source: string,
  ): MdxjsEsm {
    return {
      type: 'mdxjsEsm',
      value: Array.isArray(spcifiers)
        ? `import { ${spcifiers.join(', ')} } from '${source}';`
        : `import ${spcifiers} from '${source}';`,

      data: {
        estree: ESTreeNodeFactory.createESTreeProgramNode([
          Array.isArray(spcifiers)
            ? ESTreeNodeFactory.createNamedImportDeclarationNode(
                spcifiers,
                source,
              )
            : ESTreeNodeFactory.createDefaultImportDeclarationNode(
                spcifiers,
                source,
              ),
        ]),
      },
    };
  }

  public static createMdxJsxFlowElementNode<ComponentMetaProvider>(
    meta: ComponentMetaProvider,
    component: string | ComponentRegistration<ComponentMetaProvider>,
  ): MdxJsxFlowElement {
    const componentProvider =
      typeof component === 'string' ? { componentName: component } : component;

    return {
      type: 'mdxJsxFlowElement',
      name: componentProvider.componentName,
      // @ts-expect-error
      children: meta
        ? ensureArray(componentProvider.childrenProvider?.(meta) ?? [])
        : [],
      attributes: MdxAttrNodeFactory.createMdxJsxAttributeNodes(
        meta ? componentProvider.propsProvider?.(meta) ?? {} : {},
      ),
    };
  }
}
