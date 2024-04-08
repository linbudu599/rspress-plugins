import path from 'path';

import { MdxAttrNodeFactory } from './MdxAttrNodeFactory';

import type { Content } from 'mdast';
import type { Dictionary } from 'util-ts-types';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

export interface ComponentRegistration<ComponentMetaProvider = any> {
  componentPath: string;
  propsProvider?: (input: ComponentMetaProvider) => Dictionary<unknown>;
  childrenProvider?: (input: ComponentMetaProvider) => Content[];
}

export class MdxJsxElementFactory {
  public static createMdxJsxFlowElementNode<ComponentMetaProvider>(
    meta: ComponentMetaProvider,
    component: ComponentRegistration<ComponentMetaProvider>,
  ): MdxJsxFlowElement {
    return {
      type: 'mdxJsxFlowElement',
      name: path.basename(component.componentPath, '.tsx'),
      // @ts-expect-error
      children: meta ? component.childrenProvider?.(meta) ?? [] : [],
      attributes: MdxAttrNodeFactory.createMdxJsxAttributeNodes(
        meta ? component.propsProvider?.(meta) ?? {} : {},
      ),
    };
  }
}
