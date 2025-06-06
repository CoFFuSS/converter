import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'converter-db',
  synchronize: false,
  logging: true,
  entities: ['src/shared/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migration_table',
  migrationsRun: false,
});

export default AppDataSource;
