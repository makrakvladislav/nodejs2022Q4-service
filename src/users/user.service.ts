import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './IUser';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  async getAll() {
    return this.users;
  }

  getById(id: string) {
    console.log(id);
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const user = this.users.find((user: IUser) => user.id === id);
    console.log(user);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  createUser(userDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...userDto,
    };
    this.users.push(user);
    console.log(this.users);
    return user;
  }

  updateUser(userDto: UpdatePasswordDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const user: IUser = this.users.find((user: IUser) => user.id === id);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (user.password !== userDto.oldPassword) {
      throw new HttpException(
        `Old password ${userDto.oldPassword} is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users[userIndex] = {
      ...user,
      version: ++user.version,
      updatedAt: Date.now(),
      password: userDto.newPassword.toString(),
    };
    return this.users[userIndex];
  }

  deleteUser(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser;
  }
}
