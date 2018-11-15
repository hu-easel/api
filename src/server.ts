import * as log from 'loglevel';
import { config, database } from './dependencies';
import { app } from './express';
import { User, UserRole } from './features/users/model';
import { Database } from './database';

log.setLevel(log.levels.DEBUG);

let { expressPort } = config;
let server;

(async () => {
  log.info('EASEL is starting...');
  await database.initialize();
  log.info('Connection to database has been established successfully.');

  if (config.isDevelopmentMode) {
    if (config.shouldForceModelSync) {
      await Database.sync(true);
      await User.create({
        username: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        password: 'admin',
        hNumber: 'H00000000',
        role: UserRole.ADMIN
      });
    } else {
      await Database.sync(false);
    }
  } else {
    await Database.sync(false);
  }

  server = await app.listen(expressPort);
  log.info('Express listening on port ' + expressPort);
})();

export default server;
