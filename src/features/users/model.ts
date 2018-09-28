import * as Sequelize from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import { promisify } from 'util';

const asyncHash = promisify(bcryptjs.hash);

export enum UserRole {
  student = 'student',
  teacher = 'teacher',
  admin = 'admin,',
}

export interface UserAttributes {
  firstName: string;
  lastName: string;
  username: string;
  hNumber: string;
  role: UserRole;
  password: string;
}

export type UserInstance = Sequelize.Instance<UserAttributes>;

export type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export function createUserModel(sequelize: Sequelize.Sequelize) {
  return sequelize.define<UserInstance, UserAttributes>('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    hNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: /H[\d]{8}\b/i,
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING.BINARY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: Sequelize.ENUM,
      values: Object.keys(UserRole),
    },
  }, {
    // TODO: this means you can't know if user password is encrypted or not?
    hooks: {
      beforeCreate: (user: any, options) => {
        user.password = hashPassword(user.password);
      },
      beforeUpdate: (user: any, options) => {
        if (user.changed('password')) {
          user.password = hashPassword(user.password);
        }
        return;
      },
    },
  });
}

// export type UserModel = ReturnType<typeof createUserModel>;

export async function validatePassword(candidate: string, actual: string): Promise<boolean> {
  let hashedCandidate: string = await hashPassword(candidate);
  return hashedCandidate === actual;
}

async function hashPassword(password: string): Promise<string> {
  try {
    return await asyncHash(password, 10);
  }
  catch (err) {
    throw new Error(err);
  }
}
