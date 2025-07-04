import { LessThan } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Currency } from '../../shared/entities/currency.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { TransactionsService } from '../transactions/transactions.service';
import { TWO_HOURS } from '../../shared/constants/updateTime';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);
  private readonly nbrbApiUrl: string;

  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
    private configService: ConfigService,
    private dataSource: DataSource,
    private readonly transactionsService: TransactionsService
  ) {
    this.nbrbApiUrl = this.configService.get<string>('NBRB_API_URL');
  }

  async clearCurrencies(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.clear(Currency);
      await queryRunner.commitTransaction();
      this.logger.log('Currencies table has been cleared successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error clearing currencies table:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateCurrencies(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const ratesResponse = await axios.get(
        `${this.nbrbApiUrl}/rates?periodicity=0`
      );
      const rates = ratesResponse.data;

      const currenciesListResponse = await axios.get(
        `${this.nbrbApiUrl}/currencies`
      );
      const currenciesList = currenciesListResponse.data;

      await queryRunner.manager.save(Currency, {
        code: 'BYN',
        nameRu: 'Белорусский рубль',
        nameEn: 'Belarusian Ruble',
        scale: 1,
        rate: 1,
      });

      for (const rate of rates) {
        const currencyInfo = currenciesList.find(
          (c) => c.Cur_ID === rate.Cur_ID
        );

        if (currencyInfo) {
          await queryRunner.manager.save(Currency, {
            code: rate.Cur_Abbreviation,
            nameRu: rate.Cur_Name,
            nameEn: currencyInfo.Cur_Name_Eng,
            scale: rate.Cur_Scale,
            rate: rate.Cur_OfficialRate,
          });
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('Error updating currencies:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getCurrencies(): Promise<Currency[]> {
    const currency = await this.currenciesRepository.findOne({
      where: {
        updatedAt: LessThan(new Date(Date.now() - TWO_HOURS)),
      },
    });

    if (!currency) {
      await this.clearCurrencies();
      await this.updateCurrencies();
    }

    const currencies = await this.currenciesRepository.find();

    const hasBYN = currencies.some((c) => c.code === 'BYN');
    if (!hasBYN) {
      await this.currenciesRepository.save({
        code: 'BYN',
        nameRu: 'Белорусский рубль',
        nameEn: 'Belarusian Ruble',
        scale: 1,
        rate: 1,
      });
      currencies.push({
        id: 0,
        code: 'BYN',
        nameRu: 'Белорусский рубль',
        nameEn: 'Belarusian Ruble',
        scale: 1,
        rate: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return currencies;
  }

  async convert({
    code,
    value,
    selected,
  }: {
    code: string;
    value: string;
    selected: string[];
  }): Promise<Record<string, string>> {
    const currencies = await this.currenciesRepository.find({
      where: selected.map((c) => ({ code: c })),
    });

    const base = currencies.find((c) => c.code === code);
    if (!base) throw new Error('Base currency not found');

    const baseValue = parseFloat(value.replace(',', '.'));
    const result: Record<string, string> = {};

    for (const cur of currencies) {
      const valueInUSD = baseValue * (base.rate / base.scale);
      const valueInCur = valueInUSD / (cur.rate / cur.scale);
      result[cur.code] = valueInCur.toFixed(4);
    }
    result[code] = value;

    await this.transactionsService.create({
      baseCurrency: code,
      baseValue: value,
      targetCurrencies: selected.map((code) => ({ code, value: result[code] })),
      source: 'cache',
    });

    return result;
  }
}
