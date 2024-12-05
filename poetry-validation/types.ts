export interface ValidationResult {
  valid: boolean;
  technicalErrors: string[];
  semanticErrors: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
}
