import { DataSource, DataSourceOptions } from 'typeorm';
import { AlbumEntity } from './albums/entity/albums.entity';
import { ArtistEntity } from './artists/entity/artists.entity';
import { FavoritesEntity } from './favorites/entity/favorites.entity';
import { TrackEntity } from './tracks/entity/tracks.entity';
import { UserEntity } from './users/entity/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const configService = {
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

export default new DataSource(configService);
