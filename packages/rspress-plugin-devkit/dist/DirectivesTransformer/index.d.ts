import type { Dictionary, MaybeArray } from 'util-ts-types';
import { type RemarkPluginFactory } from '../Exports/Unist';
import type { Content } from 'mdast';
/**
 * Directives can be transformed to:
 *
 * - MDAST Node, reference directive usually, like `:comment` referencing to JSDoc comment node.
 * - Global component, like `:info` referencing to built-in `Info` component.
 */
declare const directiveTypes: string[] & {
    _type: "textComponent" | "containerComponent";
};
declare const directiveTransformerTypes: string[] & {
    _type: "globalComponent" | "astNode";
};
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
export type RemarkDirectiveTransformer<GlobalComponentExt = {}, ASTNodeExt = {}> = {
    directive: string;
    transformer: Directive2ComponentTransformer<GlobalComponentExt> | Directive2AstNodeTransformer<ASTNodeExt>;
};
export type RemarkTransformDirectiveOptions = MaybeArray<RemarkDirectiveTransformer>;
export declare const remarkTransformDirective: RemarkPluginFactory<RemarkTransformDirectiveOptions>;
export declare const remarkParseDirective: RemarkPluginFactory;
export {};
//# sourceMappingURL=index.d.ts.map