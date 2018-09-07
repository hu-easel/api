import * as Sequelize from 'sequelize';
import { sequelize } from '../../database';
import { ExcludedDay } from './excludedDays/model';

export const SEMESTER_TYPES = ['FALL', 'SUMMER 1', 'SUMMER 2', 'INTERSESSION 1', 'INTERSESSION 2', 'SPRING'];

export const Term = sequelize.define('term', {
  type: {
    type: Sequelize.ENUM,
    values: SEMESTER_TYPES,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  underscored: true,
  validate: {
    startDateAfterEndDate () {
      let { startDate, endDate } = this;
      if (startDate > endDate) {
        throw new Error('Start date cannot be after end date');
      }
      if (endDate < startDate) {
        throw new Error('End date cannot be before start date');
      }
    }
  }
});

Term.hasMany(ExcludedDay);
