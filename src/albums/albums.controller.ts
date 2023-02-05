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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly AlbumsService: AlbumsService) {}

  @Get()
  getAll() {
    return this.AlbumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.AlbumsService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createAlbum(@Body() CreateAlbumDto: CreateAlbumDto) {
    return this.AlbumsService.createAlbum(CreateAlbumDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateAlbum(@Body() UpdateTrackDto: CreateAlbumDto, @Param('id') id: string) {
    return this.AlbumsService.updateAlbum(UpdateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.AlbumsService.deleteAlbum(id);
  }
}
