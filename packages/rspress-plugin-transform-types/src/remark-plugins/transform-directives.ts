/**
 * parse :props-table directive(Text directive only).
 *
 * - Resolve from directive source attribute.
 * - Parse source typings.
 * - Replace directive node with parsed Table node.
 */
import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

export const remarkTransformDirectives: RemarkPluginFactory = () => {
  return (tree, vfile) => {
    unistVisit(tree, (node, i, parent) => {
      // console.log(JSON.stringify(tree, null, 2));
      console.log(node.type);
    });
  };
};
