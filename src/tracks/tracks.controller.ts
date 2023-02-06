import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly TracksService: TracksService) {}

  @Get()
  getAll() {
    return this.TracksService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.TracksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTrack(@Body() CreateTrackDto: CreateTrackDto) {
    return this.TracksService.createTrack(CreateTrackDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateTrack(@Body() UpdateTrackDto: CreateTrackDto, @Param('id') id: string) {
    return this.TracksService.updateTrack(UpdateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.TracksService.deleteTrack(id);
  }
}
