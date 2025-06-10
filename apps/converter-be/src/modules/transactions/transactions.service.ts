import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversionTransaction } from '../../shared/entities/conversion-transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(ConversionTransaction)
    private readonly transactionRepo: Repository<ConversionTransaction>
  ) {}

  async create(dto: CreateTransactionDto): Promise<ConversionTransaction> {
    const transaction = this.transactionRepo.create(dto);
    return this.transactionRepo.save(transaction);
  }

  async findAll(): Promise<ConversionTransaction[]> {
    return this.transactionRepo.find({ order: { date: 'DESC' } });
  }

  async findAllPaginated(
    page: number,
    limit: number
  ): Promise<{ data: ConversionTransaction[]; totalCount: number }> {
    const [data, totalCount] = await this.transactionRepo.findAndCount({
      order: { date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    const numericTotalCount =
      typeof totalCount === 'string' ? parseInt(totalCount, 10) : totalCount;
    return { data, totalCount: numericTotalCount };
  }
}
