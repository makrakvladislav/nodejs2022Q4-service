import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { ITrack } from 'src/tracks/ITrack';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbum } from './IAlbum';

@Injectable()
export class AlbumsService {
  getAll() {
    return db.albums;
  }

  getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album = db.albums.find((album: IAlbum) => album.id === id);
    if (!album) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return album;
    }
  }

  createAlbum(albumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...albumDto,
    };

    db.albums.push(album);
    return album;
  }

  updateAlbum(albumDto: CreateAlbumDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const album: IAlbum = db.albums.find((album: IAlbum) => album.id === id);
    if (!album) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const albumIndex = db.albums.findIndex((album) => album.id === id);
    db.albums[albumIndex] = {
      id: album.id,
      ...albumDto,
    };

    return db.albums[albumIndex];
  }

  deleteAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const albumIndex = db.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const albumTrack: ITrack = db.tracks.find(
      (track: ITrack) => track.albumId === id,
    );

    if (albumTrack) {
      const trackIndex = db.tracks.findIndex(
        (track) => track.id === albumTrack.id,
      );
      db.tracks[trackIndex] = {
        ...albumTrack,
        albumId: null,
      };
      db.favorites.albums = db.favorites.albums.filter((album) => album !== id);
    }

    const deletedAlbum = db.albums.splice(albumIndex, 1);
    return deletedAlbum;
  }
}
