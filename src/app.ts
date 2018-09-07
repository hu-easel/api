import { sequelize } from './database';
import { User, ROLE_STUDENT } from './features/users/model';
import * as log from 'loglevel';

log.setLevel(log.levels.TRACE);

log.info('Application is starting...');

(async () => {
  try {
    await sequelize.authenticate();
    log.info('Connection has been established successfully.');

    await User.sync({ force: true });

    await User.create({
      firstName: 'Jerred',
      lastName: 'Shepherd',
      hNumber: 'H01599828',
      password: '0',
      role: ROLE_STUDENT
    });

    let users = await User.findAll();

    log.info('Users: ', users);
  } catch (err) {
    log.error('Unable to connect to the database:', err);
  }
})();

log.info('Application stopping');
