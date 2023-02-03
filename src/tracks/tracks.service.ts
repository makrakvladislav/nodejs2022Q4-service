import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './ITrack';

@Injectable()
export class TracksService {
  private tracks: Array<ITrack> = [];

  getAll() {
    return this.tracks;
  }

  getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const track = this.tracks.find((track: ITrack) => track.id === id);
    if (!track) {
      throw new HttpException(`track ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  createTrack(trackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...trackDto,
    };
    this.tracks.push(track);
    return track;
  }

  updateTrack(trackDto: CreateTrackDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const track: ITrack = this.tracks.find((track: ITrack) => track.id === id);
    if (!track) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks[trackIndex] = {
      id: track.id,
      ...trackDto,
    };

    return this.tracks[trackIndex];
  }

  deleteTrack(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const trackIndex = this.tracks.findIndex((user) => user.id === id);
    if (trackIndex === -1) {
      throw new HttpException(`Track ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const deletedTrack = this.tracks.splice(trackIndex, 1);

    return deletedTrack;
  }
}
