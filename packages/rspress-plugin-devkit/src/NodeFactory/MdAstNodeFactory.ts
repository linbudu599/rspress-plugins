import { toString as mdastToString } from 'mdast-util-to-string';

import type {
  Root,
  Heading,
  Code,
  Paragraph,
  Link,
  Text,
  Table,
  Blockquote,
  ThematicBreak,
  Content,
} from 'mdast';

export type Depth = Heading['depth'];

export class MDASTNodeFactory {
  public static matchAllLinks(str: string) {
    const regex = /\[(.*?)\]\((.*?)\)/g;
    const matches = [...str.matchAll(regex)];
    return matches.map((match) => {
      return { text: match[1], url: match[2] };
    });
  }

  public static createRoot(children: Content[]): Root {
    return {
      type: 'root',
      children,
    };
  }

  public static createLinkNode(text: string, url: string): Link {
    return {
      type: 'link',
      url,
      children: MDASTNodeFactory.createTextChildren(text),
    };
  }

  public static createHeadingNode(text: string, depth: Depth): Heading {
    return {
      type: 'heading',
      depth,
      children: MDASTNodeFactory.createTextChildren(text),
    };
  }

  public static createTextNode(text: string): Text {
    return {
      type: 'text',
      value: text,
    };
  }

  public static toString = mdastToString;

  public static createTextChildren(text: string): Text[] {
    return [MDASTNodeFactory.createTextNode(text)];
  }

  public static createParagraphNode(text: string): Paragraph {
    return {
      type: 'paragraph',
      children: MDASTNodeFactory.createTextChildren(text),
    };
  }

  public static createBlockquote(...contents: any[]): Blockquote {
    const children = contents.map((content) =>
      typeof content === 'string'
        ? MDASTNodeFactory.createParagraphNode(content)
        : content,
    );

    return {
      type: 'blockquote',
      children,
    };
  }

  public static createThematicBreakNode(): ThematicBreak {
    return {
      type: 'thematicBreak',
    };
  }

  public static createCodeBlockNode(input: {
    lang: string;
    value: string;
    meta?: string | null;
    data?: Record<string, unknown>;
  }): Code {
    return {
      type: 'code',
      lang: input.lang,
      meta: input.meta,
      value: input.value,
      data: input.data ?? {},
    };
  }

  public static crateTableNode<T extends any = any>(
    source: T[],
    getter: {
      [key: string]: (source: T) =>
        | string
        | {
            text: string;
            url: string;
          }
        | Paragraph;
    },
  ): Table {
    const argTableFirstRow = {
      type: 'tableRow',
      children: Object.keys(getter).map((rowTitle) => {
        return {
          type: 'tableCell',
          children: MDASTNodeFactory.createTextChildren(rowTitle),
        };
      }),
    };

    return {
      type: 'table',
      align: Object.keys(getter).map(() => 'center'),

      children: ([argTableFirstRow] as any[]).concat(
        source.map((member) => {
          return {
            type: 'tableRow',
            children: Object.keys(getter).map((rowTitle) => {
              const targetGetter = getter[rowTitle];

              const value = targetGetter(member) ?? '';

              const node =
                typeof value === 'object'
                  ? 'url' in value
                    ? [MDASTNodeFactory.createLinkNode(value.text, value.url)]
                    : [value]
                  : MDASTNodeFactory.createTextChildren(value);

              return {
                type: 'tableCell',
                children: node,
              };
            }),
          };
        }),
      ),
    };
  }
}
