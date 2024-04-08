import type { RspressPlugin } from '@rspress/shared';
import type { Content } from 'mdast';
import type { Dictionary } from 'util-ts-types';

type RsbuildConfig = NonNullable<RspressPlugin['builderConfig']>;
export interface ComponentRegistration<ComponentMetaProvider = void> {
  componentPath: string;
  propsProvider?: (input: ComponentMetaProvider) => Dictionary<unknown>;
  childrenProvider?: (input: ComponentMetaProvider) => Content[];
}

export class RemarkPluginFactoryBase {
  constructor(
    private readonly baseOptions: {
      components: ComponentRegistration<any>[];
    },
  ) {}

  public get mdxComponents() {
    return this.baseOptions.components.map(
      ({ componentPath }) => componentPath,
    );
  }

  public get builderConfig(): RsbuildConfig {
    return {
      tools: {
        bundlerChain(chain) {
          chain.module
            .rule('Raw')
            .resourceQuery(/raw/)
            .type('asset/source')
            .end();

          chain.resolve.extensions.prepend('.md').prepend('.mdx');
        },
      },
    };
  }
}
