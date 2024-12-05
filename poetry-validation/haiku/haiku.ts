import { validateEnglishCharacters } from "../common/language";
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
): Promise<ValidationResult> => {
  const lines = text.split("\n").map((line) => line.trim());

  const technicalErrors: string[] = [];
  const semanticErrors: string[] = [];
  const technicalWarnings: string[] = [];
  const semanticWarnings: string[] = [];

  // Technical validations
  technicalErrors.push(...validateLineCount(lines, 3)); // Haiku must have exactly 3 lines
  technicalErrors.push(...validateSyllables(lines, [5, 7, 5])); // Syllable pattern: 5-7-5
  technicalErrors.push(...validateEnglishCharacters(text)); // Only English characters allowed
  technicalErrors.push(...validateLineWordCount(lines, 10)); // Max words per line

  // Additional technical warnings
  const rhymeWarnings = await validateNoRhymes(lines);
  technicalWarnings.push(...rhymeWarnings);

  // Example semantic validation (customize as needed)
  if (text.toLowerCase().includes("cliché")) {
    semanticWarnings.push("Avoid clichés for a more original haiku.");
  }

  return {
    valid: technicalErrors.length === 0 && semanticErrors.length === 0,
    technicalErrors,
    semanticErrors,
    technicalWarnings,
    semanticWarnings,
  };
};
