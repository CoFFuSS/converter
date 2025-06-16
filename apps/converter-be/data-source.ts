import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/shared/entites/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migration_table',
  migrationsRun: false,
});

export default AppDataSource;
