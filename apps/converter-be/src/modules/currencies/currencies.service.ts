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
    const lastUpdate = await this.currenciesRepository
      .createQueryBuilder('currency')
      .orderBy('currency.updatedAt', 'DESC')
      .getOne();

    if (
      !lastUpdate ||
      Date.now() - lastUpdate.updatedAt.getTime() > 2 * 60 * 60 * 1000
    ) {
      await this.updateCurrencies();
    }

    return this.currenciesRepository.find();
  }
}
