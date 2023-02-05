import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entity/userEntity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
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
    return new UserEntity(this.UsersService.createUser(CreateUserDto));
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() UpdatePasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return new UserEntity(this.UsersService.updateUser(UpdatePasswordDto, id));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.UsersService.deleteUser(id);
  }
}
