export interface TargetCurrency {
  code: string;
  value: string;
}

export interface Transaction {
  id: string;
  baseCurrency: string;
  baseValue: string;
  targetCurrencies: TargetCurrency[];
  date: string;
  source: string;
}
