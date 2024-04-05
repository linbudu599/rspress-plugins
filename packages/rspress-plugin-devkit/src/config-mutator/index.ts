import type { RspressPlugin } from '@rspress/shared';

type PluginConfigMutatorInput = Parameters<
  NonNullable<RspressPlugin['config']>
>[0];

type PluginConfigUtils = Parameters<NonNullable<RspressPlugin['config']>>[1];

export class PresetConfigMutator {
  constructor(
    private readonly config: PluginConfigMutatorInput,
    private readonly utils: PluginConfigUtils,
  ) {}

  public toConfig(): PluginConfigMutatorInput {
    return this.config;
  }

  public addPlugins(...plugins: RspressPlugin[]) {
    plugins.forEach((plugin) => {
      this.utils.addPlugin(plugin);
    });

    return this;
  }

  public disableMdxRs(): PresetConfigMutator {
    this.config.markdown ??= {};
    this.config.markdown.mdxRs = false;
    return this;
  }
}
