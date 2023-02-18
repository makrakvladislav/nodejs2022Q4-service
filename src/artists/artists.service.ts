import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { db } from 'src/db';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntity } from './entity/artists.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`artist ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return artist;
    }
  }

  async createArtist(artistDto: CreateArtistDto) {
    const artist = {
      ...artistDto,
    };

    const createArtist = await this.artistRepository.create(artist);
    return await await this.artistRepository.save(createArtist);
  }

  async updateArtist(artistDto: CreateArtistDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`Artist ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.artistRepository.update(id, {
      id: artist.id,
      ...artistDto,
    });

    return await this.artistRepository.findOneBy({ id });
  }

  async deleteArtist(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new HttpException(`Artist ${id} not found`, HttpStatus.NOT_FOUND);
    }

    /*
    const artistTrack = db.tracks.find((track) => track.artistId === id);

    if (artistTrack) {
      const trackIndex = db.tracks.findIndex(
        (track) => track.id === artistTrack.id,
      );
      db.tracks[trackIndex] = {
        ...artistTrack,
        artistId: null,
      };
      db.favorites.artists = db.favorites.artists.filter(
        (artist) => artist !== id,
      );
    }
    */

    return await this.artistRepository.delete({ id });
  }
}
