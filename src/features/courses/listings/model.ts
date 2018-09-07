import * as Sequelize from 'sequelize';
import { sequelize } from '../../../database';
import { CourseContent } from '../contents/model';

export const CourseListing = sequelize.define('listings', {
  department: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      allowEmpty: true
    }
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 100,
      max: 999
    }
  }
}, {
  underscored: true
});

CourseListing.hasOne(CourseContent);
