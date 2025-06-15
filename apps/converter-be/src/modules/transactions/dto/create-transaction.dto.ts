import { IsArray, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  baseCurrency: string;
  @IsString()
  baseValue: string;
  @IsArray()
  targetCurrencies: { code: string; value: string }[];
  @IsString()
  source: string; // 'cache' | 'api'
}
