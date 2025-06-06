import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreateWalletDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  wallet_type_id: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsNumber()
  balance?: number;
}
