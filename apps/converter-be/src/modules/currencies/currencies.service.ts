import { LessThan } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Currency } from '../../shared/entities/currency.entity';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);
  private readonly nbrbApiUrl: string;

  constructor(
    @InjectRepository(Currency)
    private currenciesRepository: Repository<Currency>,
    private configService: ConfigService,
    private dataSource: DataSource
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const currencies = await queryRunner.manager.find(Currency);

    if (currencies.length === 0) {
      await this.clearCurrencies();
      await this.updateCurrencies();
    }

    const currency = await queryRunner.manager.findOne(Currency, {
      where: {
        updatedAt: LessThan(new Date(Date.now() - 2 * 60 * 60 * 1000)),
      },
    });

    if (!currency) {
      await this.clearCurrencies();
      await this.updateCurrencies();
    }

    return queryRunner.manager.find(Currency);
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const currencies = await queryRunner.manager.find(Currency, {
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

    return result;
  }
}
