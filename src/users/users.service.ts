import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async getByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });
    return user;
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
    const hashPass = await bcrypt.hash(
      userDto.password,
      Number(process.env.CRYPT_SALT),
    );
    const user = {
      ...userDto,
      password: hashPass,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createUser = await this.userRepository.create(user);
    return await await this.userRepository.save(createUser);
  }

  async updateUser(userDto: UpdatePasswordDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }

    const passCheck = await bcrypt.compare(userDto.oldPassword, user.password);
    if (!passCheck) {
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
