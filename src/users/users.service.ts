import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  async createUser(userDto: CreateUserDto) {
    const user = {
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createUser = await this.userRepository.create(user);
    return await (await this.userRepository.save(createUser)).toResponse();
  }

  async updateUser(userDto: UpdatePasswordDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (user.password !== userDto.oldPassword) {
      throw new HttpException(
        `Old password ${userDto.oldPassword} is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.userRepository.update(id, {
      password: userDto.newPassword.toString(),
      version: ++user.version,
      updatedAt: Date.now(),
    });

    const updatedUser = await this.userRepository.findOneBy({ id });

    return {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }

  async deleteUser(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return await this.userRepository.delete({ id });
  }
}
