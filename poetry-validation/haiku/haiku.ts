import { i18n as I18nType, TFunction } from "i18next";

import { validateLanguageCharacters } from "../common/language";
import { validateLineWordCount } from "../common/lineWordCount";
import { validateLineCount } from "../common/structure";
import { validateSyllables } from "../common/syllable";
import { ValidationResult } from "../types";
import { validateNoRhymes } from "./noRhymes";

/**
 * Validate if a given text follows the haiku structure.
 * @param text - Full haiku text
 * @returns A promise resolving to an object with validity status, errors, and warnings.
 */
export const validateHaiku = async (
  text: string,
  t: TFunction,
  i18n: I18nType
): Promise<ValidationResult> => {
  const lines = text.split("\n").map((line) => line.trim());

  const technicalErrors: string[] = [];
  const semanticErrors: string[] = [];
  const technicalWarnings: string[] = [];
  const semanticWarnings: string[] = [];

  technicalErrors.push(...validateLineCount(lines, 3, t));
  technicalErrors.push(...validateSyllables(lines, [5, 7, 5], t));
  technicalErrors.push(...validateLanguageCharacters(text, t, i18n));
  technicalErrors.push(...validateLineWordCount(lines, 10, t));

  const rhymeWarnings = await validateNoRhymes(lines, t);
  technicalWarnings.push(...rhymeWarnings);

  if (text.toLowerCase().includes("cliché")) {
    semanticWarnings.push(t("avoid_cliches"));
  }

  return {
    valid: technicalErrors.length === 0 && semanticErrors.length === 0,
    technicalErrors,
    semanticErrors,
    technicalWarnings,
    semanticWarnings,
  };
};
