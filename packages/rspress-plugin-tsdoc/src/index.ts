import {
  ensureArray,
  remarkParseDirective,
  remarkTransformDirective,
  PresetConfigMutator,
  MDASTNodeFactory,
  type MaybeArray,
  type RemarkDirectiveTransformer,
  resolveSourcePath,
  TSSourceParser,
} from 'rspress-plugin-devkit';

import type { RspressPlugin } from '@rspress/shared';

interface TsdocDirectiveAttributes {
  /**
   * The source file path.
   */
  source: string;
}

export default function rspressPluginTsdoc(): RspressPlugin {
  const remarkTransformTsdocDirectiveConfig: RemarkDirectiveTransformer<TsdocDirectiveAttributes> =
    {
      directive: 'tsdoc',
      transformer: {
        type: 'astNode',
        getContent: (meta, vfile) => {
          const { source } = meta.attributes;

          const [sourceFile, typingDeclaration] = source.split('#');

          const resolvedSourcePath = resolveSourcePath(sourceFile, vfile.path);

          const parsedTypingDescription = TSSourceParser.parseTypingDeclaration(
            resolvedSourcePath,
            typingDeclaration,
          )!;

          const { name, description, members } = parsedTypingDescription;

          const tableTitle = MDASTNodeFactory.createHeadingNode(name, 3);

          /**
           * 属性名
           * 类型
           * 描述
           * 默认值 --- 仅支持 Component.defaultProps 提取，后面可以扩展一下
           * 是否必填
           */
          const dataSource = members.map(
            ({
              name,
              default: defaultValue,
              typingDescription,
              description,
              required,
            }) => {
              return {
                propKey: name,
                propType: typingDescription,
                required: required,
                description: description,
                defaultValue: defaultValue,
              };
            },
          );

          const tableNode = MDASTNodeFactory.crateTableNode(dataSource, {
            属性名: (row) => row.propKey,
            类型: (row) => row.propType ?? '-',
            是否必填: (row) => (row.required ? 'Y' : 'N'),
            描述: (row) => {
              const desc = row.description ?? '';
              const regex = /{@link ([^\s]+)(?: (.*?))?}/g;

              const paras: any[] = [];

              let prevIndex = 0;

              let collected = false;

              desc.replace(regex, (match, url, text, offset, string) => {
                // 如果链接文本不存在，就使用 URL 作为链接文本
                text = text || url;

                collected = true;

                paras.push(string.substring(prevIndex, offset));
                paras.push(
                  url.startsWith('http')
                    ? MDASTNodeFactory.createLinkNode(text, url)
                    : url,
                );

                prevIndex = offset + match.length;

                return '';
              });

              return collected
                ? MDASTNodeFactory.createAnyNodeParagraphNode(...paras)
                : desc;
            },
            默认值: (row) => row.defaultValue ?? '-',
          });

          return [tableTitle, tableNode];
        },
      },
    };

  return {
    name: 'rspress-plugin-tsdoc',
    config(config) {
      return new PresetConfigMutator(config).disableMdxRs().toConfig();
    },
    markdown: {
      remarkPlugins: [
        remarkParseDirective,
        [remarkTransformDirective, remarkTransformTsdocDirectiveConfig],
      ],
    },
  };
}
