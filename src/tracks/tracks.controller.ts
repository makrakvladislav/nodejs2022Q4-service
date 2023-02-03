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
  async getAll() {
    return this.TracksService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.TracksService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTrack(@Body() CreateTrackDto: CreateTrackDto) {
    return this.TracksService.createTrack(CreateTrackDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTrack(
    @Body() UpdateTrackDto: CreateTrackDto,
    @Param('id') id: string,
  ) {
    return this.TracksService.updateTrack(UpdateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.TracksService.deleteTrack(id);
  }
}
