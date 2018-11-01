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
    log.info('Initializing sequelize');

    let { config } = this;
    // let sequelize = this.sequelize;

    if (this.sequelize) {
      log.error('Sequelize is already initialized');
    } else {
      let { dbHost, dbPort, dbName, dbUsername, dbPassword } = config;
      this.sequelize = new Sequelize({
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
        operatorsAliases: false,
        logging: log.trace
      });

      this.sequelize.addModels([User]);
      await this.sequelize.authenticate();
    }
  }

  close (): any {
    if (this.sequelize) {
      log.info('Closing sequelize');
      return this.sequelize.close();
    } else {
      log.error('Sequelize is not initialized');
      return null;
    }
  }
}
