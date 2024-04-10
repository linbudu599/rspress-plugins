import {
  SyntaxKind,
  Project,
  InterfaceDeclaration,
  TypeAliasDeclaration,
} from 'ts-morph';

import { FunctionDeclaration, VariableStatement, SourceFile } from 'ts-morph';

export class TSParserUtils {
  public static ParserProject = new Project();

  public static isFunctionDeclaration(
    input: FunctionDeclaration | VariableStatement
  ): input is FunctionDeclaration {
    return input.getKind() === SyntaxKind.FunctionDeclaration;
  }

  public static getFunctionDeclaration(
    source: SourceFile,
    name: string
  ): FunctionDeclaration | VariableStatement | undefined {
    return source.getFunction(name) || source.getVariableStatement(name);
  }

  public static isInterfaceDeclaration(
    input: InterfaceDeclaration | TypeAliasDeclaration
  ): input is InterfaceDeclaration {
    return input.getKind() === SyntaxKind.InterfaceDeclaration;
  }

  public static getTypingDeclaration(
    source: SourceFile,
    name: string
  ): InterfaceDeclaration | TypeAliasDeclaration | undefined {
    return source.getTypeAlias(name) || source.getInterface(name);
  }
}
