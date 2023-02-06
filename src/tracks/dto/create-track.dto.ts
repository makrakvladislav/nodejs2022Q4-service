import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @MinLength(2, {
    message: 'Track name is too short',
  })
  name: string;
  @IsOptional()
  @IsString()
  artistId: string | null;
  @IsOptional()
  @IsString()
  albumId: string | null;
  @IsNumber()
  duration: number;
}
