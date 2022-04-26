import { SuggestionsDataType } from ".";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | undefined;
  autoSuggestion?: boolean;
  autoSuggestionData?: SuggestionsDataType;
  onClickSuggestion?: (selected: string, selectedId: number) => void;
}
