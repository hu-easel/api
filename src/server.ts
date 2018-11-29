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
  log.info(config);
  try {
    await database.initialize();
  } catch (err) {
    log.error('Error initializing database');
    log.error(err);
    database.close();
    return;
  }

  log.info('Connection to database has been established successfully.');

  try {
    await Database.sync(config.shouldForceModelSync);
  } catch (err) {
    log.error('Error syncing models');
    log.error(err);
    database.close();
    return;
  }

  if (!await User.findOne({
    where: {
      username: 'admin'
    }
  })) {
    await User.create({
      username: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      hNumber: 'H00000000',
      role: UserRole.ADMIN
    });
  }

  server = await app.listen(expressPort);
  log.info('Express listening on port ' + expressPort);
})();

export default server;
