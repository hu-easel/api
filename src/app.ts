import * as log from 'loglevel';
import { database } from './dependencies';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyparser from 'body-parser';
import router from './routes';
import { handleError } from './middleware';

log.setLevel(log.levels.TRACE);

let app: express.Express | null = null;

init();

function init () {
  (async () => {
    log.info('EASEL is starting...');
    await initDatabase();

    initExpress();
  })();
}

async function initDatabase () {
  try {
    database.initialize();
    if (database.sequelize) {
      await database.sequelize.authenticate();
      log.info('Connection to database has been established successfully.');
    }
  } catch (err) {
    log.error('Unable to connect to the database: ', err);
  }
}

function initExpress () {
  app = express();

  app.use(morgan('dev'));
  app.use(bodyparser.json());
  app.use('/api', router);
  app.use(handleError);
}

export {
  app
};
