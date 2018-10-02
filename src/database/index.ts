import * as Sequelize from 'sequelize';
import * as log from 'loglevel';
import { UserModel, createUserModel } from '../features/users/model';
import Config from '../config/Config';

interface Models {
  user?: UserModel;
}

export class Database {
  sequelize?: Sequelize.Sequelize;
  private models: Models = {};
  private config: Config;

  constructor (config: Config) {
    this.config = config;
  }

  initialize () {
    this.sequelize = new Sequelize(this.config.dbName, this.config.dbUsername, this.config.dbPassword, {
      host: this.config.dbHost,
      port: this.config.dbPort,
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
