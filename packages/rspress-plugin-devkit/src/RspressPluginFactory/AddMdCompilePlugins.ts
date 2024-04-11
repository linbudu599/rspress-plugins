import { PresetConfigMutator } from '../ConfigMutator';

import type { RspressPlugin } from '@rspress/shared';
import type { PluggableList } from 'unified';

export class RspressPluginAddMdCompilePlugins {
  constructor(
    private readonly options: {
      name: string;
      remarkPlugins?: PluggableList;
      rehypePlugins?: PluggableList;
    },
  ) {}

  public toPlugin(): RspressPlugin {
    return {
      name: this.options.name,
      config(config) {
        return new PresetConfigMutator(config).disableMdxRs().toConfig();
      },
      markdown: {
        remarkPlugins: this.options.remarkPlugins ?? [],
        rehypePlugins: this.options.rehypePlugins ?? [],
      },
    };
  }
}
