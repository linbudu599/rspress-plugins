import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

interface RemarkParseObsidianOptions {
  superSyntax?: string;
  subSyntax?: string;
}

export const remarkParseObsidian: RemarkPluginFactory<
  RemarkParseObsidianOptions
> = (options) => {
  return (tree, vfile) => {
    unistVisit(tree, 'text', (node, i, parent) => {});
  };
};
