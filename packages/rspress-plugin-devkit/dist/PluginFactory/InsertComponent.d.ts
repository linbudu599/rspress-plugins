import type { RspressPlugin } from '@rspress/shared';
import type { ComponentRegistration } from '../Shared';
interface ComponentInsertDescriptor extends ComponentRegistration {
    position: 'pre' | 'post';
}
interface Options {
    name: string;
    components: ComponentInsertDescriptor[];
}
export declare class InsertComponentPluginFactory {
    private readonly options;
    constructor(options: Options);
    private createRemarkPlugin;
    private patchConfig;
    patch(input: Omit<RspressPlugin, 'name'>): this;
    instantiate(): RspressPlugin;
}
export {};
//# sourceMappingURL=InsertComponent.d.ts.map