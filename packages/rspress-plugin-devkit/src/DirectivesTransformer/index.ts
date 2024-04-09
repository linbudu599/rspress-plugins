import type { Dictionary, MaybeArray } from 'util-ts-types';
import { toString } from 'mdast-util-to-string';
import _remarkParseDirective from 'remark-mdc';

import { unistVisit, type RemarkPluginFactory } from '../Exports/Unist';

import { createTuple } from '../Utils/createTuple';
import { ensureArray } from '../Utils/ensureArray';

import type { Content } from 'mdast';
import { MdxAttrNodeFactory } from '../NodeFactory/MdxAttrNodeFactory';

/**
 * Directives can be transformed to:
 *
 * - MDAST Node, reference directive usually, like `:comment` referencing to JSDoc comment node.
 * - Global component, like `:info` referencing to built-in `Info` component.
 */

const directiveTypes = createTuple('textComponent', 'containerComponent');
const directiveTransformerTypes = createTuple('globalComponent', 'astNode');

export type DirectiveTypes = typeof directiveTypes._type;
export type DirectiveTransformerTypes = typeof directiveTransformerTypes._type;

type ParsedDirectiveMeta = {
  type: DirectiveTypes;
  name: string;
  attributes: Dictionary<string>;
  parsedAttributes?: Dictionary<string>;
};

type Directive2ComponentTransformer<Ext = {}> = {
  type: 'globalComponent';
  getComponentName: (meta: ParsedDirectiveMeta) => string;
  getComponentProps?: (attributes: Dictionary<string>) => Dictionary<string>;
  getComponentChildren?: (meta: ParsedDirectiveMeta, node: any) => string;
} & Ext;

type Directive2AstNodeTransformer<Ext = {}> = {
  type: 'astNode';
  getContent: (meta: ParsedDirectiveMeta) => Content[];
} & Ext;

export type RemarkDirectiveTransformer<
  GlobalComponentExt = {},
  ASTNodeExt = {},
> = {
  directive: string;
  transformer:
    | Directive2ComponentTransformer<GlobalComponentExt>
    | Directive2AstNodeTransformer<ASTNodeExt>;
};

export type RemarkTransformDirectiveOptions =
  MaybeArray<RemarkDirectiveTransformer>;

export const remarkTransformDirective: RemarkPluginFactory<
  RemarkTransformDirectiveOptions
> = (options = []) => {
  const directiveTransformers = ensureArray(options);

  return (tree, vfile) => {
    unistVisit(tree, (node: any, index = 0, parent) => {
      if (!directiveTypes.includes(node.type)) {
        return;
      }

      directiveTransformers.forEach((trdirectiveTransformeransformer) => {
        const { transformer, directive } = trdirectiveTransformeransformer;

        if (node.name !== directive) {
          return;
        }

        const meta: ParsedDirectiveMeta = {
          type: node.type,
          name: node.name,
          attributes: node.attributes,
        };

        const transformerType = transformer.type;

        if (transformerType === 'astNode') {
          const content = transformer.getContent(meta);

          parent!.children.splice(index, 1, ...content);
        } else if (transformerType === 'globalComponent') {
          const attrsNormalizer =
            transformer?.getComponentProps ??
            MdxAttrNodeFactory.createMdxJsxAttributeNodes;

          parent!.children.splice(index, 1, {
            type: 'mdxJsxFlowElement',
            name: transformer.getComponentName(meta),
            attributes: attrsNormalizer(meta.attributes),
            children: transformer.getComponentChildren
              ? [
                  {
                    type: 'text',
                    value: transformer.getComponentChildren(meta, node),
                  },
                ]
              : [
                  {
                    type: 'text',
                    value: toString(node),
                  },
                ],
          });
        } else {
        }
      });
    });
  };
};

export const remarkParseDirective =
  _remarkParseDirective as unknown as RemarkPluginFactory;
