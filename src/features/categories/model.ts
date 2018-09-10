import * as Sequelize from 'sequelize';
import { sequelize } from '../../database/index';

export const Category = sequelize.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      allowEmpty: true
    }
  }
}, {
  underscored: true
});
