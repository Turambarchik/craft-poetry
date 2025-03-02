import { PoetryForm } from "../utils/constants";
import { validateHaiku } from "./haiku/haiku";
import { validateSonnet } from "./sonnet";
import { PoetryValidator } from "./types";

export const poetryValidators: Record<PoetryForm, PoetryValidator> = {
  [PoetryForm.Haiku]: validateHaiku,
  [PoetryForm.Sonnet]: validateSonnet,
};
