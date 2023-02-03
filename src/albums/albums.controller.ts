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
  async getAll() {
    return this.AlbumsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.AlbumsService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAlbum(@Body() CreateAlbumDto: CreateAlbumDto) {
    return this.AlbumsService.createAlbum(CreateAlbumDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateAlbum(
    @Body() UpdateTrackDto: CreateAlbumDto,
    @Param('id') id: string,
  ) {
    return this.AlbumsService.updateAlbum(UpdateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.AlbumsService.deleteAlbum(id);
  }
}
