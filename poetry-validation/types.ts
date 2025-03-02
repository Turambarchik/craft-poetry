import { i18n as I18nType, TFunction } from "i18next";
export interface ValidationResult {
  valid: boolean;
  technicalErrors: string[];
  semanticErrors: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
}

export type PoetryValidator = (
  text: string,
  t: TFunction,
  i18n: I18nType
) => Promise<ValidationResult>;
