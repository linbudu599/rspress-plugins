import path from 'path';
import {
  unistVisit,
  type Dictionary,
  type RemarkPluginFactory,
} from 'rspress-plugin-devkit';

interface RemarkParseDirectivesOptions {
  superSyntax?: string;
  subSyntax?: string;
}

const createTuple = <const T extends string>(...input: T[]) => {
  return input as string[] & { _type: T };
};

const directiveTypes = createTuple('textComponent', 'containerComponent');

type DirectiveTypes = typeof directiveTypes._type;

type ParsedDirectiveMeta = {
  type: DirectiveTypes;
  name: string;
  attributes: Dictionary<string>;
};

/**
 * transform directive to specified node, or to global components?
 */

export const remarkParseDirectives: RemarkPluginFactory<
  RemarkParseDirectivesOptions
> = (options) => {
  return (tree, vfile) => {
    unistVisit(tree, (node, index = 0, parent) => {
      if (directiveTypes.includes(node.type)) {
        console.log('node: ', node);
        // for incorrect [] parse recovery
        // if (node.name === 'span') {
        //   const previousNode = parent!.children[i! - 1];

        //   const recoveredRawContent = NodeFactory.MDAST.toString(node);

        //   const recoveredContent = recoveredRawContent
        //     ? `[${recoveredRawContent}]`
        //     : '[]';

        //   if (!previousNode) {
        //     parent!.children.splice(i!, 1, {
        //       type: 'text',
        //       value: recoveredContent,
        //     });
        //     return SKIP;
        //   }

        //   if (previousNode?.type === 'text') {
        //     previousNode.value += recoveredContent;
        //     parent!.children.splice(i!, 1);
        //     return SKIP;
        //   }
        // }

        const parsedAttrs = Object.entries(node.attributes)?.map(
          ([key, val]) => {
            return {
              type: 'mdxJsxAttribute',
              name: key,
              value: val,
            };
          },
        );

        // key is regarded as preserved word in jsx
        parent!.children.splice(index, 1, {
          type: 'mdxJsxFlowElement',
          name: 'Fallback',
          // attributes: {
          //   ...node.attributes,
          // },
          attributes: parsedAttrs,
          // [
          //   {
          //     type: 'mdxJsxAttribute',
          //     name: 'isMobile',
          //     value: isMobileMode,
          //   },
          //   {
          //     type: 'mdxJsxAttribute',
          //     name: 'demoId',
          //     value: demoId,
          //   },
          // ],
        });
      }
    });
  };
};
