import * as Sequelize from 'sequelize';
import { sequelize } from '../../../database';

export const ExcludedDay = sequelize.define('excluded_day', {
  name: {
    type: Sequelize.STRING
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
