import * as Sequelize from 'sequelize';
import { sequelize } from '../../../database/index';
import { Category } from '../model';

export const Setup = sequelize.define('Setup', {
  weight: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  numberOfAssignmentsDropped: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  underscored: true
});

Setup.hasOne(Category);
