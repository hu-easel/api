import * as log from 'loglevel';
import { config, database } from './dependencies';
import { app } from './express';
import { User } from './features/users/model';

log.setLevel(log.levels.DEBUG);

let { expressPort } = config;

(async () => {
  log.info('EASEL is starting...');
  await database.initialize();
  log.info('Connection to database has been established successfully.');

  await User.sync();

  await app.listen(expressPort);
  log.info('Express listening on port ' + expressPort);
})();
