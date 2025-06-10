import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ConversionTransaction } from '../../shared/entities/conversion-transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ): Promise<{ data: ConversionTransaction[]; totalCount: number }> {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    return this.transactionsService.findAllPaginated(pageNum, limitNum);
  }
}
