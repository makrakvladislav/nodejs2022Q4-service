import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './IUser';
import { v4 as uuidv4 } from 'uuid';
import { validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { db } from 'src/db';

@Injectable()
export class UsersService {
  getAll() {
    return db.users;
  }

  getById(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const user = db.users.find((user: IUser) => user.id === id);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  createUser(userDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    db.users.push(user);
    //const { password, ...updatedUser } = user;
    //return updatedUser;
    return user;
  }

  updateUser(userDto: UpdatePasswordDto, id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }

    const user: IUser = db.users.find((user: IUser) => user.id === id);
    if (!user) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (user.password !== userDto.oldPassword) {
      throw new HttpException(
        `Old password ${userDto.oldPassword} is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const userIndex = db.users.findIndex((user) => user.id === id);

    db.users[userIndex] = {
      ...user,
      version: ++user.version,
      updatedAt: Date.now(),
      password: userDto.newPassword.toString(),
    };

    //const { password, ...updatedUser } = this.users[userIndex];
    return db.users[userIndex];
  }

  deleteUser(id: string) {
    if (!isValidUUID(id)) {
      throw new HttpException(`Id ${id} not valid`, HttpStatus.BAD_REQUEST);
    }
    const userIndex = db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND);
    }
    const deletedUser = db.users.splice(userIndex, 1);

    return deletedUser;
  }
}
