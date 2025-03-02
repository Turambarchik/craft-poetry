import { TFunction } from "i18next";

export const validateLineCount = (
  lines: string[],
  expectedLineCount: number,
  t: TFunction
): string[] => {
  const errors: string[] = [];
  if (lines.length !== expectedLineCount) {
    errors.push(
      t("line_count_error", {
        expected: expectedLineCount,
        found: lines.length,
      })
    );
  }
  return errors;
};
