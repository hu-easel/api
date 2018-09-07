import * as Sequelize from 'sequelize';
import { sequelize } from '../../../database';

export const CourseContent = sequelize.define('contents', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      allowEmpty: true
    }
  }
});
