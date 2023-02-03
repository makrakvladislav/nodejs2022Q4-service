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

@Module({
  imports: [UsersModule, ArtistsModule, TracksModule],
  controllers: [AppController, ArtistsController, TracksController],
  providers: [AppService, ArtistsService, TracksService],
})
export class AppModule {}
