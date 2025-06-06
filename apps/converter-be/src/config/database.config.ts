import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../shared/entites/user.entity';
import { Permission } from '../shared/entites/permission.entity';
import { Wallet } from '../shared/entites/wallet.entity';
import { AuthProvider } from '../shared/entites/auth-provider.entity';
import { WalletType } from '../shared/entites/wallet-type.entity';
import { UserPermission } from '../shared/entites/user-permission.entity';

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('database.host'),
  port: configService.get<number>('database.port'),
  username: configService.get<string>('database.username'),
  password: configService.get<string>('database.password'),
  database: configService.get<string>('database.database'),
  entities: [
    User,
    AuthProvider,
    Permission,
    UserPermission,
    WalletType,
    Wallet,
  ],
  migrations: ['dist/apps/converter-be/src/migrations/*.js'],
  migrationsTableName: 'migration_table',
  migrationsRun: false,
  synchronize: false,
  logging: configService.get<string>('nodeEnv') !== 'production',
});
