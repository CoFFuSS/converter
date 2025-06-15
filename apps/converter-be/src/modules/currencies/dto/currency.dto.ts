import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CurrencyDto {
  @ApiProperty({ description: 'Уникальный идентификатор валюты' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Код валюты (например, USD)', example: 'USD' })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Название валюты на русском языке',
    example: 'Доллар США',
  })
  @IsString()
  nameRu: string;

  @ApiProperty({
    description: 'Название валюты на английском языке',
    example: 'US Dollar',
    required: false,
  })
  @IsString()
  nameEn?: string;

  @ApiProperty({ description: 'Масштаб валюты', example: 1 })
  @IsNumber()
  scale: number;

  @ApiProperty({ description: 'Курс обмена', example: 3.2345 })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Дата создания записи' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления записи' })
  @IsDate()
  updatedAt: Date;
}
