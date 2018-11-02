import { Sequelize } from 'sequelize-typescript';
import * as log from 'loglevel';
import { User } from '../features/users/model';
import Config from '../config/Config';
import { Term } from '../features/terms/model';
import { Listing } from '../features/courses/listing/model';

export class Database {
  sequelize?: Sequelize;
  private config: Config;

  constructor (config: Config) {
    this.config = config;
  }

  async initialize () {
    log.info('Trying to initialize sequelize');
    let { config } = this;

    if (this.sequelize) {
      log.error('Sequelize is already initialized');
    } else {
      log.info('Initializing sequelize');
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

      this.sequelize.addModels([
        User,
        Term,
        Listing
      ]);
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
