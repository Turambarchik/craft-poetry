/**
 * Validate the number of lines in a poem.
 * @param lines - Array of text lines
 * @param expectedLineCount - Expected number of lines
 * @returns Errors if line count does not match
 */
export const validateLineCount = (
  lines: string[],
  expectedLineCount: number,
): string[] => {
  const errors: string[] = [];
  if (lines.length !== expectedLineCount) {
    errors.push(`Expected ${expectedLineCount} lines. (Found ${lines.length})`);
  }
  return errors;
};
