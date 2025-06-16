export class CreateTransactionDto {
  baseCurrency: string;
  baseValue: string;
  targetCurrencies: { code: string; value: string }[];
  source: string; // 'cache' | 'api'
}
