import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { db } from 'src/db';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './entity/tracks.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  async createTrack(trackDto: CreateTrackDto) {
    const track = {
      ...trackDto,
    };

    const createTrack = await this.trackRepository.create(track);
    return await this.trackRepository.save(createTrack);
  }

  async updateTrack(trackDto: CreateTrackDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.update(id, {
      id: track.id,
      ...trackDto,
    });

    return await this.trackRepository.findOneBy({ id });
  }

  async deleteTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }
    /*
    db.favorites.tracks = db.favorites.tracks.filter((track) => track !== id);
    const deletedTrack = db.tracks.splice(trackIndex, 1);
    */
    return await this.trackRepository.delete({ id });
  }
}
