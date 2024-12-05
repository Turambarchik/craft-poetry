import { syllable } from "syllable";

/**
 * Count syllables for each line and validate against a target pattern.
 * @param lines - Array of text lines
 * @param pattern - Array of expected syllable counts per line
 * @returns Errors if syllable counts don't match the pattern
 */
export const validateSyllables = (
  lines: string[],
  pattern: number[],
): string[] => {
  const errors: string[] = [];
  const syllableCounts = lines.map((line) => syllable(line));

  for (let i = 0; i < pattern.length; i++) {
    if (syllableCounts[i] !== pattern[i]) {
      errors.push(
        `Line ${i + 1} must have ${pattern[i]} syllables. (Found ${syllableCounts[i]})`,
      );
    }
  }

  return errors;
};
