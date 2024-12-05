/**
 * Validates that each line does not exceed a specified maximum number of words.
 *
 * @param lines - An array of strings, where each string represents a line of text.
 * @param maxWordsPerLine - The maximum number of words allowed per line.
 * @returns An array of error messages if any lines exceed the maximum word count.
 */
export const validateLineWordCount = (
  lines: string[],
  maxWordsPerLine: number,
): string[] => {
  const errors: string[] = [];

  lines.forEach((line, index) => {
    const words = line.split(" ").filter(Boolean);
    if (words.length > maxWordsPerLine) {
      errors.push(
        `Line ${index + 1} is too long. Max ${maxWordsPerLine} words allowed.`,
      );
    }
  });

  return errors;
};
