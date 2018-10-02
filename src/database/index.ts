import * as Sequelize from 'sequelize';
import config from '../config';
import * as log from 'loglevel';
import { UserModel, createUserModel } from '../features/users/model';

export const sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: log.debug
});

interface Models {
  user?: UserModel;
}

export class Database {
  private sequelize?: Sequelize.Sequelize;
  private models: Models = {};

  initialize () {
    this.sequelize = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
      host: config.dbHost,
      port: config.dbPort,
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: log.debug
    });
  }

  get UserModel (): UserModel {
    if (!this.sequelize) {
      throw new Error('Database is not initialized');
    }
    if (!this.models.user) {
      this.models.user = createUserModel(this.sequelize);
    }
    return this.models.user;
  }
}
