export class PresetConfigMutator {
    constructor(config, utils) {
        this.config = config;
        this.utils = utils;
    }
    toConfig() {
        return this.config;
    }
    addPlugins(...plugins) {
        if (!this.utils) {
            throw new Error('PluginConfigUtils not provided.');
        }
        plugins.forEach((plugin) => {
            this.utils.addPlugin(plugin);
        });
        return this;
    }
    disableMdxRs() {
        var _a;
        var _b;
        (_a = (_b = this.config).markdown) !== null && _a !== void 0 ? _a : (_b.markdown = {});
        this.config.markdown.mdxRs = false;
        return this;
    }
}
