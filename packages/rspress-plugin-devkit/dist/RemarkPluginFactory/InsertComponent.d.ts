import { ComponentRegistration, RemarkPluginFactoryBase } from './FactoryBase';
import type { Plugin } from 'unified';
import type { Root } from 'mdast';
interface ComponentInsertDescriptor extends ComponentRegistration<void> {
    position: 'pre' | 'post';
}
interface Options {
    components: ComponentInsertDescriptor[];
}
export declare class RemarkInsertComponentPluginFactory extends RemarkPluginFactoryBase {
    readonly options: Options;
    constructor(options: Options);
    get remarkPlugin(): Plugin<[unknown], Root>;
}
export {};
//# sourceMappingURL=InsertComponent.d.ts.map