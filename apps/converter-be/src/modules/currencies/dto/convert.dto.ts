import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class ConvertRequestDto {
  @ApiProperty({
    description: 'Код валюты, в которую введено значение',
    example: 'USD',
  })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Введённое значение', example: '100' })
  @IsString()
  value: string;

  @ApiProperty({
    description: 'Список кодов выбранных валют',
    example: ['USD', 'EUR', 'RUB', 'BYN'],
  })
  @IsArray()
  @IsString({ each: true })
  selected: string[];
}

export class ConvertResponseDto {
  [code: string]: string;
}
