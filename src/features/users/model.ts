import { hashSync, hash } from 'bcryptjs';
import {
  DataType,
  Column,
  Is,
  IsAlpha,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
  AllowNull,
  Default
} from 'sequelize-typescript';

export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  ADMIN = 'ADMIN'
}

export interface UserAttributes {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  hNumber: string;
  password: string;
  role: UserRole;
}

export interface PublicUserAttributes {
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

@Table
export class User extends Model<User> implements UserAttributes {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @Unique
  @AllowNull(false)
  @NotEmpty
  @Column
  username: string;

  @AllowNull(false)
  @NotEmpty
  @IsAlpha
  @Column
  firstName: string;

  @AllowNull(false)
  @NotEmpty
  @IsAlpha
  @Column
  lastName: string;

  @Unique
  @NotEmpty
  @AllowNull(false)
  @Is(/H[\d]{8}\b/i)
  @Column
  hNumber: string;

  @NotEmpty
  @AllowNull(false)
  @Column(DataType.STRING.BINARY)
  get password (): string {
    return this.getDataValue('password');
  }

  set password (password: string) {
    password = User.hashPasswordSync(password);
    this.setDataValue('password', password);
  }

  @Column
  role: UserRole;

  async validatePassword (candidate: string): Promise<boolean> {
    return await User.hashPassword(candidate) === this.password;
  }

  toJSON (): PublicUserAttributes {
    return {
      uuid: this.uuid,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };
  }

  static hashPasswordSync (password: string): string {
    return hashSync(password, 10);
  }

  static hashPassword (password: string): Promise<string> {
    return hash(password, 10);
  }
}
