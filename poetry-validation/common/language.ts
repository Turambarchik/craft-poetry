/**
 * Validate that the text contains only English characters and allowed punctuation.
 * @param text - The full text to validate
 * @returns Errors if non-English or disallowed characters are found
 */
export const validateEnglishCharacters = (text: string): string[] => {
  const errors: string[] = [];
  const nonAllowedCharacters = text.match(/[^a-zA-Z\s\.,'"\-:;?!(){}\[\]—]/g);

  if (nonAllowedCharacters) {
    errors.push(
      `Only English characters and standard punctuation are allowed. Found: ${nonAllowedCharacters.join(", ")}`,
    );
  }

  return errors;
};
