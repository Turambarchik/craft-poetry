import { SUPPORTED_LANGS } from "utils/constants";

export type Language = (typeof SUPPORTED_LANGS)[number];

export interface PoetryErrors {
  technical: string[];
  semantic: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
}
