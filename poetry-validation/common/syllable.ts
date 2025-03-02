import { TFunction } from "i18next";
import { syllable } from "syllable";

export const validateSyllables = (
  lines: string[],
  pattern: number[],
  t: TFunction
): string[] => {
  const errors: string[] = [];
  const syllableCounts = lines.map((line) => syllable(line));
  for (let i = 0; i < pattern.length; i++) {
    if (syllableCounts[i] !== pattern[i]) {
      errors.push(
        t("line_syllables_error", {
          line: i + 1,
          expected: pattern[i],
          found: syllableCounts[i],
        })
      );
    }
  }
  return errors;
};
