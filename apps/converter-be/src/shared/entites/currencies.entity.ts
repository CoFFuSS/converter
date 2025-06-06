import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('currencies')
export class WalletType {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar')
  name: string; // e.g., "USD", "EUR", "BYN"

  @Column('decimal', { precision: 20, scale: 8, default: 0 })
  currency_rate: number;

  @UpdateDateColumn()
  updated_at: Date;
}
