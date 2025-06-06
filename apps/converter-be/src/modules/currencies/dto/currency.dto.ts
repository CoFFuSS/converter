import { ApiProperty } from '@nestjs/swagger';

export class CurrencyDto {
  @ApiProperty({ description: 'Уникальный идентификатор валюты' })
  id: number;

  @ApiProperty({ description: 'Код валюты (например, USD)', example: 'USD' })
  code: string;

  @ApiProperty({ description: 'Название валюты на русском языке', example: 'Доллар США' })
  nameRu: string;

  @ApiProperty({ description: 'Название валюты на английском языке', example: 'US Dollar', required: false })
  nameEn?: string;

  @ApiProperty({ description: 'Масштаб валюты', example: 1 })
  scale: number;

  @ApiProperty({ description: 'Курс обмена', example: 3.2345 })
  rate: number;

  @ApiProperty({ description: 'Дата создания записи' })
  createdAt: Date;

  @ApiProperty({ description: 'Дата последнего обновления записи' })
  updatedAt: Date;
} 