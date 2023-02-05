import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';
import { AlbumsService } from 'src/albums/albums.service';
import { IAlbum } from 'src/interfaces/IAlbum';
import { ArtistsService } from 'src/artists/artists.service';
import { db } from 'src/db';
import { TracksService } from 'src/tracks/tracks.service';
import { validate as isValidUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  getAll() {
    const artists = db.favorites.artists.map((id) => {
      return this.artistsService.getById(id);
    });
    const tracks = db.favorites.tracks.map((id) => {
      return this.tracksService.getById(id);
    });
    const albums = db.favorites.albums.map((id) => {
      return this.albumsService.getById(id);
    });

    return {
      albums,
      artists,
      tracks,
    };
  }

  addTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        `Track ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.tracks.push(id);
    return track;
  }

  addArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        `Artist ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.artists.push(id);
    return artist;
  }

  addAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album: IAlbum = db.albums.find((album: IAlbum) => album.id === id);
    if (!album) {
      throw new HttpException(
        `Album ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    db.favorites.albums.push(id);
    return album;
  }

  removeTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const trackIndex = db.favorites.tracks.findIndex((track) => track === id);
    if (trackIndex === -1) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const deletedTrack = db.favorites.tracks.splice(trackIndex, 1);
    return deletedTrack;
  }

  removeAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const albumIndex = db.favorites.albums.findIndex((album) => album === id);
    if (albumIndex === -1) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const deletedAlbum = db.favorites.albums.splice(albumIndex, 1);
    return deletedAlbum;
  }

  removeArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artistIndex = db.favorites.artists.findIndex(
      (artist) => artist === id,
    );
    if (artistIndex === -1) {
      throw new HttpException(`Artist ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const deletedArtist = db.favorites.artists.splice(artistIndex, 1);
    return deletedArtist;
  }
}
