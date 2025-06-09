export interface CurrencyValue {
  code: string;
  value: string;
}

export interface Currency {
  id: number;
  code: string;
  nameRu: string;
  nameEn?: string;
  scale: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface CurrenciesState {
  all: Currency[];
  selected: string[];
  values: Record<string, string>;
  loading: boolean;
  error: string | null;
}
