import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('conversion_transaction')
export class ConversionTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  baseCurrency: string;

  @Column('decimal', { precision: 18, scale: 6 })
  baseValue: string;

  @Column('jsonb')
  targetCurrencies: { code: string; value: string }[];

  @CreateDateColumn()
  date: Date;

  @Column()
  source: string; // 'cache' | 'api'
}
