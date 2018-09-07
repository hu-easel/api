import * as Sequelize from 'sequelize';
import config from '../config';
import * as log from 'loglevel';

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
  logging: (msg: string) => log.debug(msg)
});
