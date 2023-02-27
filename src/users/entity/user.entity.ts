import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../interfaces/IUser';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'int8' })
  createdAt: number;

  @Column({ type: 'int8' })
  updatedAt: number;

  /*
  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt, updatedAt };
  }
  */

  constructor(partial: Partial<IUser>) {
    Object.assign(this, partial);
  }
}
