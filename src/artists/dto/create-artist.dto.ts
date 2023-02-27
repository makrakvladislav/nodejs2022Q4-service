import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @MinLength(2, {
    message: 'Artist name is too short',
  })
  name: string;
  @IsBoolean()
  grammy: boolean;
}
