import * as log from 'loglevel';
import { config, database } from './dependencies';
import { app } from './express';
import { User, UserRole } from './features/users/model';
import { Term } from './features/terms/model';
import { Listing } from './features/courses/listings/model';
import { Content } from './features/courses/contents/model';

log.setLevel(log.levels.DEBUG);

let { expressPort } = config;
let server;

(async () => {
  log.info('EASEL is starting...');
  await database.initialize();
  log.info('Connection to database has been established successfully.');

  if (config.isDevelopmentMode) {
    if (config.shouldForceModelSync) {
      await User.sync({
        force: true
      });
      await Term.sync({
        force: true
      });
      await Listing.sync({
        force: true
      });
      await Content.sync({
        force: true
      });
      await User.create({
        username: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        password: 'admin',
        hNumber: 'H00000000',
        role: UserRole.ADMIN
      });
    }
  } else {
    await User.sync();
    await Term.sync();
    await Listing.sync();
    await Content.sync();
  }

  server = await app.listen(expressPort);
  log.info('Express listening on port ' + expressPort);
})();

export default server;
