import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { AlbumEntity } from 'src/albums/entity/albums.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistEntity } from 'src/artists/entity/artists.entity';
import { TrackEntity } from 'src/tracks/entity/tracks.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesEntity } from './entity/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
      FavoritesEntity,
    ]),
    AlbumsModule,
    ArtistsModule,
    TracksModule,
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
