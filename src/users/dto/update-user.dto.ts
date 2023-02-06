import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(3, {
    message: 'Password is too short',
  })
  oldPassword: string;

  @IsString()
  @MinLength(3, {
    message: 'Password is too short',
  })
  newPassword: string;
}
