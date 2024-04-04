import type { RspressPlugin } from '@rspress/shared';

type PluginConfigMutatorInput = Parameters<
  NonNullable<RspressPlugin['config']>
>[0];

export class PresetConfigMutator {
  constructor(private readonly config: PluginConfigMutatorInput) {}

  public toConfig(): PluginConfigMutatorInput {
    return this.config;
  }

  public disableMdxRs(): PresetConfigMutator {
    this.config.markdown ??= {};
    this.config.markdown.mdxRs = false;
    return this;
  }
}
