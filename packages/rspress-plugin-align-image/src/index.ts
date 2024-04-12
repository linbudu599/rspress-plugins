import {
  PresetConfigMutator,
  unistVisit,
  type HASTRoot,
  type RehypePluginFactory,
} from 'rspress-plugin-devkit';
import type { RspressPlugin } from '@rspress/shared';

export interface RspressPluginAlignImageOptions {
  containerClassNames?: string[];
  justify?: 'center' | 'left' | 'right';
}

export default function rspressPluginAlignImage(
  options: RspressPluginAlignImageOptions = {},
): RspressPlugin {
  return {
    name: 'rspress-plugin-align-image',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      rehypePlugins: [[rehypeAlignImage(), options]],
    },
  };
}

function rehypeAlignImage(): RehypePluginFactory<RspressPluginAlignImageOptions> {
  return (options) => {
    const { containerClassNames = [], justify = 'center' } = options;

    return (tree: HASTRoot) => {
      unistVisit(tree, 'element', (node) => {
        if (
          node.tagName === 'p' &&
          node.children.length === 1 &&
          isImageElement(node.children[0])
        ) {
          node.tagName = 'div';

          node.properties ??= {};
          node.properties.className = [
            'my-4',
            'flex',
            'flex-row',
            getJustifyClass(justify),
            ...containerClassNames,
          ];
        }
      });
    };
  };
}

function isImageElement(node: any): node is Element {
  return node.type === 'mdxJsxFlowElement' && node.name === 'img';
}

function getJustifyClass(justify: 'center' | 'left' | 'right'): string {
  switch (justify) {
    case 'center':
      return 'justify-center';
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-center';
  }
}
