import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: 'Login is too short',
  })
  login: string;

  @IsString()
  @MinLength(3, {
    message: 'Password is too short',
  })
  password: string;
}
