import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UnauthorizedRequest } from './auth/decorators/unautorized.decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UnauthorizedRequest()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
