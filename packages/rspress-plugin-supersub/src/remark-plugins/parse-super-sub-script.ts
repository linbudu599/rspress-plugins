import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

interface RemarkParseSuperSubScriptOptions {
  superSyntax?: string;
  subSyntax?: string;
}

export const remarkParseSuperSubScript: RemarkPluginFactory<
  RemarkParseSuperSubScriptOptions
> = (options) => {
  const { superSyntax = '^', subSyntax = '_' } = options ?? {};

  const superSyntaxRegex = new RegExp(`\\${superSyntax}`);
  const subSyntaxRegex = new RegExp(`\\${subSyntax}`);

  const syntaxReplacers = [
    {
      regex: superSyntaxRegex,
      type: 'superscript',
      tagName: 'sup',
    },
    {
      regex: subSyntaxRegex,
      type: 'subscript',
      tagName: 'sub',
    },
  ];

  return (tree, vfile) => {
    unistVisit(tree, 'text', (node, i, parent) => {
      const { value } = node;

      syntaxReplacers.forEach(({ regex, type, tagName }) => {
        const values = value.split(regex);

        if (values.length === 1 || values.length % 2 === 0) {
          return;
        }

        const children = values.map((str, i) =>
          i % 2 === 0
            ? {
                type: 'text',
                value: str,
              }
            : {
                type,
                data: {
                  hName: tagName,
                },
                children: [
                  {
                    type: 'text',
                    value: str,
                  },
                ],
              },
        );

        // @ts-expect-error
        parent!.children.splice(i!, 1, ...children);
      });
    });
  };
};
