import { TFunction } from "i18next";

export const validateLineWordCount = (
  lines: string[],
  maxWordsPerLine: number,
  t: TFunction
): string[] => {
  const errors: string[] = [];
  lines.forEach((line, index) => {
    const words = line.split(" ").filter(Boolean);
    if (words.length > maxWordsPerLine) {
      errors.push(
        t("line_too_long", { line: index + 1, max: maxWordsPerLine })
      );
    }
  });
  return errors;
};
