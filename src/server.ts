import * as log from 'loglevel';
import { config, database } from './dependencies';
import { app } from './express';

log.setLevel(log.levels.TRACE);

let { expressPort } = config;

(async () => {
  log.info('EASEL is starting...');
  await database.initialize();
  log.info('Connection to database has been established successfully.');
  await app.listen(expressPort);
  log.info('Express listening on port ' + expressPort);
})();
