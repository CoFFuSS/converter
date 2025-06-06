import { Controller, Get, Delete } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Currency } from '../../shared/entities/currency.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CurrencyDto } from './dto/currency.dto';

@ApiTags('Валюты')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех валют', description: 'Возвращает список всех доступных валют с их курсами. Данные обновляются каждые 2 часа.' })
  @ApiResponse({
    status: 200,
    description: 'Список валют успешно получен',
    type: [CurrencyDto],
  })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  async getCurrencies(): Promise<Currency[]> {
    return this.currenciesService.getCurrencies();
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Очистить таблицу валют', description: 'Удаляет все записи из таблицы валют' })
  @ApiResponse({
    status: 200,
    description: 'Таблица валют успешно очищена',
  })
  @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
  async clearCurrencies(): Promise<void> {
    return this.currenciesService.clearCurrencies();
  }
} 