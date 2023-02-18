import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  migrationsRun: true,
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/**/*.entity.{ts,js}'],
  migrations: [__dirname + './migration/*.{ts,js}'],
} as DataSourceOptions;
