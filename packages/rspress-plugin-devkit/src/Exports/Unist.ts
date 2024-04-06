import type { Plugin } from 'unified';

import type { Root as MDASTRoot } from 'mdast';
import type { Root as HASTRoot } from 'hast';

export type RemarkPluginFactory<PluginOptions = unknown> = Plugin<
  [PluginOptions],
  MDASTRoot
>;

export type RehypePluginFactory<PluginOptions = unknown> = Plugin<
  [PluginOptions],
  HASTRoot
>;

export { visit as unistVisit } from 'unist-util-visit';
export { fromMarkdown } from 'mdast-util-from-markdown';
export { toMarkdown } from 'mdast-util-to-markdown';

export type { Plugin, MDASTRoot, HASTRoot };
