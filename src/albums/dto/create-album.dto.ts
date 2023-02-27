import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @MinLength(2, {
    message: 'Album name is too short',
  })
  name: string;
  @IsNumber()
  year: number;
  @IsOptional()
  @IsString()
  artistId: string | null;
}
