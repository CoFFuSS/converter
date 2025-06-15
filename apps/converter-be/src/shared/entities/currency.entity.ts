import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  nameRu: string;

  @Column({ nullable: true })
  nameEn: string;

  @Column('decimal', { precision: 10, scale: 4 })
  scale: number;

  @Column('decimal', { precision: 10, scale: 4 })
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
