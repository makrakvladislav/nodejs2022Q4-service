import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async signup(userDto: CreateUserDto) {
    return await this.UsersService.createUser(userDto);
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const user = await this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      console.log(refreshTokenDto.refreshToken, user, 'REFRESHDTO');
      return this.generateToken(user);
    } catch (err) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async generateToken(user: Omit<UserEntity, 'password'>) {
    const payload = { id: user.id, login: user.login };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.UsersService.getByLogin(userDto.login);
    if (user) {
      const passCheck = await bcrypt.compare(userDto.password, user.password);
      if (user && passCheck) {
        return user;
      }
    } else {
      throw new HttpException(
        'Invalid login or password',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
