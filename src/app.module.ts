import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsService } from './albums/albums.service';

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [
    AppController,
    ArtistsController,
    TracksController,
    AlbumsController,
  ],
  providers: [AppService, ArtistsService, TracksService, AlbumsService],
})
export class AppModule {}
