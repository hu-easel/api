import { hash } from 'bcryptjs';
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
  Unique, AllowNull, Default
} from 'sequelize-typescript';

export enum UserRole {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  ADMIN = 'ADMIN'
}

@Table
export class User extends Model<User> {

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
  get password () {
    return this.getDataValue('password');
  }

  set password (password) {
    User.hashPassword(password).then(hashedPassword => {
      this.setDataValue('password', hashedPassword);
    });
  }

  @Column
  role: UserRole;

  async validatePassword (candidate: string): Promise<boolean> {
    return await User.hashPassword(candidate) === this.password;
  }

  toJSON () {
    return {
      uuid: this.uuid,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role
    };
  }

  static hashPassword (password: string): Promise<string> {
    return hash(password, 10);
  }
}
