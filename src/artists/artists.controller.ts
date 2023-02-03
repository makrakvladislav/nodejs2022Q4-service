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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly ArtistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return this.ArtistsService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.ArtistsService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createArtist(@Body() CreateArtistDto: CreateArtistDto) {
    return this.ArtistsService.createArtist(CreateArtistDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateArtist(
    @Body() UpdateArtistDto: CreateArtistDto,
    @Param('id') id: string,
  ) {
    return this.ArtistsService.updateArtist(UpdateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.ArtistsService.deleteArtist(id);
  }
}
