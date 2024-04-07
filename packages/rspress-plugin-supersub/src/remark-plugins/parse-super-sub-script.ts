import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

export interface RemarkParseSuperSubScriptOptions {
  /**
   * The syntax for superscript.
   *
   * @example
   *
   * ```markdown
   * x^2^
   * ```
   *
   * Will be converted to:
   *
   * `x<sup>2</sup>`
   *
   * @default '^'
   */
  superSyntax?: string;
  /**
   * The syntax for subscript.
   *
   * @example
   *
   * ```markdown
   * H_2_O
   * ```
   * Will be converted to:
   *
   * `H<sub>2</sub>O`
   *
   * @default '_'
   */
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
