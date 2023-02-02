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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getAll() {
    return this.UsersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.UsersService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.UsersService.createUser(CreateUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() UpdatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.UsersService.updateUser(UpdatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.UsersService.deleteUser(id);
  }
}
