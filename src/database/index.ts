import { Sequelize } from 'sequelize-typescript';
import * as log from 'loglevel';
import { User } from '../features/users/model';
import Config from '../config/Config';

export class Database {
  sequelize?: Sequelize;
  private config: Config;

  constructor (config: Config) {
    this.config = config;
  }

  async initialize () {
    let { config, sequelize } = this;
    let { dbHost, dbPort, dbName, dbUsername, dbPassword } = config;
    sequelize = new Sequelize({
      host: dbHost,
      port: dbPort,
      database: dbName,
      username: dbUsername,
      password: dbPassword,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: log.debug
    });

    sequelize.addModels([User]);
    await sequelize.authenticate();
  }
}
