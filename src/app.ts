import { sequelize } from './database';
import * as log from 'loglevel';
import * as express from 'express';
import * as bodyparser from 'body-parser';
import router from './routes';
import config from './config';
import { handleError } from './middleware';
import * as morgan from 'morgan';

log.setLevel(log.levels.TRACE);

init();

function init () {
  (async () => {
    log.info('EASEL is starting...');
    await initDatabase();

    // Drops table
    // await UserModel.sync({ force: true });

    initExpress();
  })();
}

async function initDatabase () {
  try {
    await sequelize.authenticate();
    log.info('Connection to database has been established successfully.');
  } catch (err) {
    log.error('Unable to connect to the database: ', err);
  }
}

function initExpress () {
  let app = express();
  let { expressPort } = config;

  app.use(morgan('dev'));
  app.use(bodyparser.json());
  app.use('/api', router);
  app.use(handleError);

  app.listen(expressPort, () => {
    log.info('Express listening on port ' + expressPort);
  });
}
