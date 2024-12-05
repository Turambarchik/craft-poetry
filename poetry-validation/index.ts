import { PoetryForm } from "../helpers/constants";
import { validateHaiku } from "./haiku/haiku";
import { validateSonnet } from "./sonnet";
import { ValidationResult } from "./types";

export const poetryValidators: Record<
  PoetryForm,
  (text: string) => Promise<ValidationResult>
> = {
  [PoetryForm.Haiku]: validateHaiku,
  [PoetryForm.Sonnet]: validateSonnet,
};
