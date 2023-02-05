import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  getAll() {
    return db.tracks;
  }

  getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  createTrack(trackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...trackDto,
    };

    db.tracks.push(track);
    return track;
  }

  updateTrack(trackDto: CreateTrackDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const trackIndex = db.tracks.findIndex((track) => track.id === id);
    db.tracks[trackIndex] = {
      id: track.id,
      ...trackDto,
    };

    return db.tracks[trackIndex];
  }

  deleteTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const trackIndex = db.tracks.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }

    db.favorites.tracks = db.favorites.tracks.filter((track) => track !== id);
    const deletedTrack = db.tracks.splice(trackIndex, 1);

    return deletedTrack;
  }
}
