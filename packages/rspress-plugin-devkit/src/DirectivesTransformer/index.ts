import type { Dictionary, MaybeArray } from 'util-ts-types';
import { toString } from 'mdast-util-to-string';
import _remarkParseDirective from 'remark-mdc';

import { unistVisit, type RemarkPluginFactory } from '../Exports/Unist';

import { createTuple } from '../Utils/createTuple';
import { ensureArray } from '../Utils/ensureArray';

import type { Content } from 'mdast';
import { MdxAttrNodeFactory } from '../NodeFactory/MdxAttrNodeFactory';
import { VFile } from 'vfile';

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

type ParsedDirectiveMeta<Attrs = Dictionary<string>> = {
  type: DirectiveTypes;
  name: string;
  attributes: Attrs;
};

type Directive2ComponentTransformer<
  DirectiveAttributes = Dictionary<string>,
  Ext = {},
> = {
  type: 'globalComponent';
  getComponentName: (
    meta: ParsedDirectiveMeta<DirectiveAttributes>,
    vfile: VFile,
  ) => string;
  getComponentProps?: (
    attributes: DirectiveAttributes,
    vfile: VFile,
  ) => Dictionary<string>;
  getComponentChildren?: (
    meta: ParsedDirectiveMeta<DirectiveAttributes>,
    node: any,
    vfile: VFile,
  ) => string;
} & Ext;

type Directive2AstNodeTransformer<
  DirectiveAttributes = Dictionary<string>,
  Ext = {},
> = {
  type: 'astNode';
  getContent: (
    meta: ParsedDirectiveMeta<DirectiveAttributes>,
    vfile: VFile,
  ) => Content[];
} & Ext;

export type RemarkDirectiveTransformer<
  DirectiveAttributes = Dictionary<string>,
  GlobalComponentExt = {},
  ASTNodeExt = {},
> = {
  directive: string;
  transformer:
    | Directive2ComponentTransformer<DirectiveAttributes, GlobalComponentExt>
    | Directive2AstNodeTransformer<DirectiveAttributes, ASTNodeExt>;
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
          const content = transformer.getContent(meta, vfile);

          parent!.children.splice(index, 1, ...content);
        } else if (transformerType === 'globalComponent') {
          const attrsNormalizer =
            transformer?.getComponentProps ??
            MdxAttrNodeFactory.createMdxJsxAttributeNodes;

          parent!.children.splice(index, 1, {
            type: 'mdxJsxFlowElement',
            name: transformer.getComponentName(meta, vfile),
            attributes: attrsNormalizer(meta.attributes, vfile),
            children: transformer.getComponentChildren
              ? [
                  {
                    type: 'text',
                    value: transformer.getComponentChildren(meta, node, vfile),
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
