import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Currency } from '../shared/entities/currency.entity';
import { ConversionTransaction } from '../shared/entities/conversion-transaction.entity';

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.username'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.database'),
  entities: [Currency, ConversionTransaction],
  migrations: ['dist/apps/converter-be/src/migrations/*.js'],
  migrationsTableName: 'migration_table',
  migrationsRun: false,
  synchronize: false,
  logging: configService.get<string>('nodeEnv') !== 'production',
});
