import * as Sequelize from 'sequelize';
import { sequelize } from '../../database';
import { CourseListing } from './listings/model';
import { Term } from '../terms/model';

export const Course = sequelize.define('course', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
      allowEmpty: true
    }
  },
  section: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  underscored: true
});

Course.hasOne(CourseListing);
Course.hasOne(Term);
