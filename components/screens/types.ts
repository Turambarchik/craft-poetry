export interface TableProps {
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: (text: string) => Promise<void>;
  technicalErrors: string[];
  semanticErrors: string[];
  technicalWarnings: string[];
  semanticWarnings: string[];
  handleGptAnalyze: () => void;
  analysis: string | null;
  loadingAnalysis: boolean;
  formContentIsInValid: boolean;
  handleCreate: () => void;
  warningModalOpen: boolean;
  setWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleWarningConfirm: () => void;
}
