import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isValidUUID } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entity/albums.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return await this.albumRepository.find();
  }

  async getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return album;
    }
  }

  async createAlbum(albumDto: CreateAlbumDto) {
    const album = {
      ...albumDto,
    };

    const createAlbum = await this.albumRepository.create(album);
    return await this.albumRepository.save(createAlbum);
  }

  async updateAlbum(albumDto: CreateAlbumDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.update(id, {
      id: album.id,
      ...albumDto,
    });

    return await this.albumRepository.findOneBy({ id });
  }

  async deleteAlbum(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new HttpException(`Album ${id} not found`, HttpStatus.NOT_FOUND);
    }

    /*
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
    */
    return await this.albumRepository.delete({ id });
  }
}
