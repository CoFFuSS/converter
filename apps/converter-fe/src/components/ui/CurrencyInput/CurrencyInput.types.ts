export interface CurrencyInputProps {
  code: string;
  nameRu: string;
  nameEn?: string;
  value: string;
  disabled?: boolean;
  onChange?: (code: string, value: string) => void;
}
