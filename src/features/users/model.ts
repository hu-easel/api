import * as Sequelize from 'sequelize';
import { sequelize } from '../../database';

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
    allowNull: false,
    validate: {
      is: /H[\d]{8}\b/i,
      isAlphanumeric: true,
      notEmpty: true
    }
  },
  password: {
    // todo hash
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
});
