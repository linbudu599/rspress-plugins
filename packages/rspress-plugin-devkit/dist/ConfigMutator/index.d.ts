import type { RspressPlugin } from '@rspress/shared';
type PluginConfigMutatorInput = Parameters<NonNullable<RspressPlugin['config']>>[0];
export declare class PresetConfigMutator {
    private readonly config;
    private readonly utils?;
    constructor(config: PluginConfigMutatorInput, utils?: {
        addPlugin: (plugin: RspressPlugin) => void;
        removePlugin: (pluginName: string) => void;
    } | undefined);
    toConfig(): PluginConfigMutatorInput;
    addPlugins(...plugins: RspressPlugin[]): this;
    disableMdxRs(): PresetConfigMutator;
}
export {};
//# sourceMappingURL=index.d.ts.map