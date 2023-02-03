import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { ITrack } from 'src/tracks/ITrack';
import { TracksService } from 'src/tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IArtist } from './IArtist';

@Injectable()
export class ArtistsService {
  getAll() {
    return db.artists;
  }

  getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artist = db.artists.find((artist: IArtist) => artist.id === id);
    if (!artist) {
      throw new HttpException(`artist ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return artist;
    }
  }

  createArtist(artistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...artistDto,
    };
    db.artists.push(artist);
    return artist;
  }

  updateArtist(artistDto: CreateArtistDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const artist: IArtist = db.artists.find(
      (artist: IArtist) => artist.id === id,
    );
    if (!artist) {
      throw new HttpException(`Artist ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const artistIndex = db.artists.findIndex((artist) => artist.id === id);

    db.artists[artistIndex] = {
      id: artist.id,
      ...artistDto,
    };

    return db.artists[artistIndex];
  }

  deleteArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artistIndex = db.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new HttpException(`Artist ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const artistTrack: ITrack = db.tracks.find(
      (track: ITrack) => track.artistId === id,
    );

    if (artistTrack) {
      const trackIndex = db.tracks.findIndex(
        (track) => track.id === artistTrack.id,
      );
      db.tracks[trackIndex] = {
        ...artistTrack,
        artistId: null,
      };
    }

    const deletedArtist = db.artists.splice(artistIndex, 1);

    return deletedArtist;
  }
}
