import type { RspressPlugin } from '@rspress/shared';
import type { ComponentRegistration } from '../Shared';
interface ComponentTransform extends ComponentRegistration<string> {
    lang: string;
}
interface Options {
    name: string;
    transformers: ComponentTransform[];
}
export declare class CodeBlock2GlobalComponentPluginFactory {
    private readonly options;
    constructor(options: Options);
    private createRemarkPlugin;
    private patchConfig;
    patch(input: Omit<RspressPlugin, 'name'>): this;
    instantiate(): RspressPlugin;
}
export {};
//# sourceMappingURL=CodeBlock2GlobalComponent.d.ts.map