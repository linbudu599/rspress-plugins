import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

interface RemarkParseSuperSubScriptOptions {}

export const remarkParseSuperSubScript: RemarkPluginFactory<
  RemarkParseSuperSubScriptOptions
> = () => {
  return (tree, vfile) => {
    unistVisit(tree, 'text', (node, i, parent) => {
      const { value } = node;

      const values = value.split(/\^/);

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
              type: 'superscript',
              data: {
                hName: 'sup',
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
      parent!.children?.splice(i!, 1, ...children);
    });

    // Subscript
    unistVisit(tree, 'text', (node, i, parent) => {
      if (node.type !== 'text') {
        return;
      }

      const { value } = node;

      // eslint-disable-next-line no-useless-escape
      const values = value.split(/\&/);

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
              type: 'subscript',
              data: {
                hName: 'sub',
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
  };
};
