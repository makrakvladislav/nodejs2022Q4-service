import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as isValidUUID } from 'uuid';
import { FavoritesEntity } from './entity/favorites.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/tracks/entity/tracks.entity';
import { ArtistEntity } from 'src/artists/entity/artists.entity';
import { AlbumEntity } from 'src/albums/entity/albums.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const favorites = await this.favoritesRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (favorites.length === 0) {
      return await this.favoritesRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      });
    }
    return favorites[0];
  }

  async addTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (!track) {
      throw new HttpException(
        `Track ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesTrack = await this.getAll();
    favoritesTrack.tracks.push(track);
    await this.favoritesRepository.save(favoritesTrack);
    return track;
  }

  async addArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      throw new HttpException(
        `Artist ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesArtist = await this.getAll();
    favoritesArtist.artists.push(artist);
    await this.favoritesRepository.save(favoritesArtist);
    return artist;
  }

  async addAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException(
        `Album ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesAlbum = await this.getAll();
    favoritesAlbum.albums.push(album);
    await this.favoritesRepository.save(favoritesAlbum);
    return album;
  }

  async removeTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(
        `Track ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesTrack = await this.getAll();
    const deletedTrack = favoritesTrack.tracks.filter(
      (track) => track.id !== id,
    );
    favoritesTrack.tracks = deletedTrack;
    await this.favoritesRepository.save(favoritesTrack);
    return deletedTrack;
  }

  async removeAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(
        `Album ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesAlbum = await this.getAll();
    const deletedAlbum = favoritesAlbum.albums.filter(
      (album) => album.id !== id,
    );
    favoritesAlbum.albums = deletedAlbum;
    await this.favoritesRepository.save(favoritesAlbum);
    return deletedAlbum;
  }

  async removeArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(
        `Artist ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const favoritesArtist = await this.getAll();
    const deletedArtist = favoritesArtist.artists.filter(
      (artist) => artist.id !== id,
    );
    favoritesArtist.artists = deletedArtist;
    await this.favoritesRepository.save(favoritesArtist);
    return deletedArtist;
  }
}
