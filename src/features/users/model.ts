import * as Sequelize from 'sequelize';
import { sequelize } from '../../database';
import * as bcryptjs from 'bcryptjs';
import { promisify } from 'util';

const asyncHash = promisify(bcryptjs.hash);

export const ROLE_STUDENT = 'STUDENT';
export const ROLE_PROFESSOR = 'PROFESSOR';
export const ROLE_ADMIN = 'ADMIN';

const USER_ROLES = [ROLE_STUDENT, ROLE_PROFESSOR, ROLE_ADMIN];
const DEFAULT_ROLE = ROLE_STUDENT;

export const UserModel = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      isAlpha: true,
      notEmpty: true
    }
  },
  hNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /H[\d]{8}\b/i,
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING.BINARY,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: Sequelize.ENUM,
    values: USER_ROLES,
    defaultValue: DEFAULT_ROLE
  }
}, {
  hooks: {
    beforeCreate: (user: any, options) => {
      user.password = hashPassword(user.password);
    },
    beforeUpdate: (user: any, options) => {
      if (user.changed('password')) {
        user.password = hashPassword(user.password);
      }
      return;
    }
  }
});

export async function validatePassword (candidate: string, actual: string): Promise<boolean> {
  let hashedCandidate: string = await hashPassword(candidate);
  return hashedCandidate === actual;
}

async function hashPassword (password: string): Promise<string> {
  try {
    return await asyncHash(password, 10);
  } catch (err) {
    throw new Error(err);
  }
}
