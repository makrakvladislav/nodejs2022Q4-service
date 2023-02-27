import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshToken } from './decorators/refresh.decorators';
import { UnauthorizedRequest } from './decorators/unautorized.decorators';
import { RefreshTokenDto } from './dto/refreshtoken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UnauthorizedRequest()
  @HttpCode(StatusCodes.OK)
  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() userDto: CreateUserDto) {
    return this.AuthService.login(userDto);
  }

  @UnauthorizedRequest()
  @Post('signup')
  @UsePipes(ValidationPipe)
  signup(@Body() userDto: CreateUserDto) {
    return this.AuthService.signup(userDto);
  }

  @RefreshToken()
  @HttpCode(StatusCodes.OK)
  @Post('refresh')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.AuthService.refresh(refreshTokenDto);
  }
}
