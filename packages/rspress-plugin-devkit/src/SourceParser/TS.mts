import { Project, SyntaxKind } from 'ts-morph';

import { TSParserUtils } from './ParserUtils.mjs';
import { Nullable } from 'util-ts-types';

export interface ParsedTypingDescriptionMember {
  name: string;
  description: string;
  typingDescription: string;
  default: Nullable<string>;
  required: boolean;
}

export interface ParsedTypingDescription {
  name: string;
  members: ParsedTypingDescriptionMember[];
  description: string;
}

export class TSSourceParser {
  public static parseTypingDeclaration(
    filePath: string,
    name: string,
  ): Nullable<ParsedTypingDescription> {
    const source = TSParserUtils.ParserProject.addSourceFileAtPath(filePath);
    const input = TSParserUtils.getTypingDeclaration(source, name);

    if (!input) return null;

    const declarationName = input.getName();

    const declarationDescription = input
      .getJsDocs()[0]
      ?.getComment()
      ?.toString();

    const parsedMembers: ParsedTypingDescriptionMember[] = [];

    input
      .getType()
      .getProperties()
      .forEach((propertyKey) => {
        const property = propertyKey
          .getValueDeclarationOrThrow()
          .asKind(SyntaxKind.PropertySignature)!;

        const memberName = propertyKey.getName();

        const memberType = property?.getType().getText();

        const memberRequired = !property.hasQuestionToken();

        const memberJSDocComment = property.getJsDocs()[0];

        if (!memberJSDocComment) {
          parsedMembers.push({
            name: memberName,
            typingDescription: memberType,
            required: memberRequired,
            description: '',
            default: null,
          });

          return;
        }

        const memberDescription = memberJSDocComment.getCommentText();

        const memberDefault = memberJSDocComment
          .getTags()
          .find((tag) => tag.getTagName() === 'default')
          ?.getCommentText();

        parsedMembers.push({
          name: memberName,
          description: memberDescription || '',
          typingDescription: memberType,
          default: memberDefault || null,
          required: memberRequired,
        });
      });

    TSParserUtils.ParserProject.removeSourceFile(source);

    return {
      name: declarationName,
      description: declarationDescription || '',
      members: parsedMembers,
    };
  }

  public static findTargetExport(
    filePath: string,
    functionName: string,
  ): Nullable<string> {
    const source = TSParserUtils.ParserProject.addSourceFileAtPath(filePath);

    const allExports = source.getStatements();

    const targetExport = allExports.find((statement) => {
      const kind = statement.getKind();

      if (kind === SyntaxKind.FunctionDeclaration) {
        const currentFunctionName = statement
          .asKind(SyntaxKind.FunctionDeclaration)
          ?.getName();

        return currentFunctionName && currentFunctionName === functionName;
      }

      if (kind === SyntaxKind.VariableStatement) {
        const declaration = statement
          .asKind(SyntaxKind.VariableStatement)
          ?.getDeclarations()[0];

        const isArrowFunc =
          declaration?.getInitializer()?.getKind() === SyntaxKind.ArrowFunction;

        if (!isArrowFunc) return false;

        const currentFunctionName = declaration?.getName();

        return currentFunctionName && currentFunctionName === functionName;
      }
    });

    if (!targetExport) return null;

    const jsdocContent = targetExport
      .asKind(SyntaxKind.VariableStatement)
      ?.getJsDocs()[0]
      ?.getText();

    TSParserUtils.ParserProject.removeSourceFile(source);

    return `${jsdocContent}\n${targetExport.getText()}`;
  }
}
