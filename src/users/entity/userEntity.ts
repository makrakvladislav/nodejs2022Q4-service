import { Exclude } from 'class-transformer';
import { IUser } from '../IUser';

export class UserEntity {
  @Exclude()
  password: string;

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
