import type {
  MdxJsxAttribute,
  MdxJsxExpressionAttribute,
} from 'mdast-util-mdx-jsx';
import { Dictionary, StrictOmit } from 'util-ts-types';

import type {
  ObjectExpression,
  Expression,
  ExpressionStatement,
  Program,
  SpreadElement,
  Property,
  Statement,
  Literal,
} from 'estree-jsx';
import { isObject } from '../Utils/is';

export class ESTreeNodeFactory {
  private static createBasePropertyNode(): StrictOmit<
    Property,
    'key' | 'value'
  > {
    return {
      type: 'Property',
      method: false,
      shorthand: false,
      computed: false,
      kind: 'init',
    };
  }

  public static createLiteralPropertyNode(
    key: string,
    val: number | string | boolean,
  ): Property {
    return {
      ...this.createBasePropertyNode(),
      key: {
        type: 'Identifier',
        name: key,
      },
      value: {
        type: 'Literal',
        value: val,
        raw: JSON.stringify(val),
      },
    };
  }

  public static createObjectPropertyNode(
    key: string,
    val: Dictionary<any>,
  ): Property {
    return {
      ...this.createBasePropertyNode(),
      key: {
        type: 'Identifier',
        name: key,
      },
      value: {
        type: 'ObjectExpression',
        properties: Object.entries(val).map(([k, v]) => {
          return isObject(v)
            ? this.createObjectPropertyNode(k, v)
            : this.createLiteralPropertyNode(k, v);
        }),
      },
    };
  }

  public static createSpreadExpressionNode(
    spread: Dictionary<any>,
  ): ExpressionStatement {
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'ObjectExpression',
        properties: [
          {
            type: 'SpreadElement',
            argument: {
              type: 'ObjectExpression',
              properties: Object.entries(spread).map(([k, v]) => {
                return isObject(v)
                  ? this.createObjectPropertyNode(k, v)
                  : this.createLiteralPropertyNode(k, v);
              }),
            },
          } satisfies SpreadElement,
        ],
      } satisfies ObjectExpression,
    };
  }

  public static createESTreeProgramNode(statements: Statement[]): Program {
    return {
      type: 'Program',
      sourceType: 'module',
      body: statements,
    };
  }
}
