import { isObject } from '../Utils/is';

import type { Dictionary, StrictOmit } from 'util-ts-types';
import type {
  ObjectExpression,
  SimpleLiteral,
  ExpressionStatement,
  Program,
  SpreadElement,
  Property,
  Statement,
  Identifier,
  ArrayExpression,
} from 'estree-jsx';

import type { Primitive } from '../Shared';

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

  public static createIdentifierNode(name: string): Identifier {
    return {
      type: 'Identifier',
      name,
    };
  }

  public static createLiteralNode(val: Primitive): SimpleLiteral {
    return {
      type: 'Literal',
      value: val ?? '',
      raw: JSON.stringify(val),
    };
  }

  public static createObjectExpressionNode(
    val: Dictionary<any>,
  ): ObjectExpression {
    return {
      type: 'ObjectExpression',
      properties: Object.entries(val).map(([k, v]) =>
        ESTreeNodeFactory.createPropertyNode(k, v),
      ),
    };
  }

  public static createArrayExpressionNode(val: Array<any>): ArrayExpression {
    return {
      type: 'ArrayExpression',
      elements: val.map((v) => ESTreeNodeFactory.createValueNode(v)),
    };
  }

  public static createValueNode(input: Primitive): SimpleLiteral;
  public static createValueNode(input: Array<any>): ArrayExpression;
  public static createValueNode(input: Dictionary): ObjectExpression;
  public static createValueNode(
    input: Array<any> | Primitive | Dictionary,
  ): SimpleLiteral | ArrayExpression | ObjectExpression {
    if (Array.isArray(input)) {
      return ESTreeNodeFactory.createArrayExpressionNode(input);
    }

    if (isObject(input)) {
      return ESTreeNodeFactory.createObjectExpressionNode(input);
    }

    return ESTreeNodeFactory.createLiteralNode(input);
  }

  public static createLiteralPropertyNode(
    key: string,
    val: Primitive,
  ): Property {
    return {
      ...ESTreeNodeFactory.createBasePropertyNode(),
      key: ESTreeNodeFactory.createIdentifierNode(key),
      value: ESTreeNodeFactory.createLiteralNode(val),
    };
  }

  public static createObjectPropertyNode(
    key: string,
    val: Dictionary,
  ): Property {
    return {
      ...ESTreeNodeFactory.createBasePropertyNode(),
      key: ESTreeNodeFactory.createIdentifierNode(key),
      value: ESTreeNodeFactory.createObjectExpressionNode(val),
    };
  }

  public static createArrayPropertyNode(
    key: string,
    val: Array<any>,
  ): Property {
    return {
      ...ESTreeNodeFactory.createBasePropertyNode(),
      key: ESTreeNodeFactory.createIdentifierNode(key),
      value: ESTreeNodeFactory.createArrayExpressionNode(val),
    };
  }

  public static createPropertyNode(
    key: string,
    val: Primitive | Array<any> | Dictionary,
  ): Property {
    if (Array.isArray(val)) {
      return ESTreeNodeFactory.createArrayPropertyNode(key, val);
    }

    if (isObject(val)) {
      return ESTreeNodeFactory.createObjectPropertyNode(key, val);
    }

    return ESTreeNodeFactory.createLiteralPropertyNode(key, val);
  }

  public static createSpreadObjectExpressionNode(
    spread: Dictionary,
  ): ExpressionStatement {
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'ObjectExpression',
        properties: [
          {
            type: 'SpreadElement',
            argument: ESTreeNodeFactory.createObjectExpressionNode(spread),
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
