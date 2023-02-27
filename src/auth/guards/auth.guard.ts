import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist';
import 'dotenv/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const unauthorizedRequest = this.reflector.get(
      'allowUnauthorizedRequest',
      context.getHandler(),
    );

    if (unauthorizedRequest) {
      return true;
    } else {
      try {
        const header = request.headers.authorization.split(' ');
        const bearer = header[0];
        const token = header[1];
        if (!token || bearer !== 'Bearer') {
          throw new UnauthorizedException('Add token to autorization header');
        }
        this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        });
        return true;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
