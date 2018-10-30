import * as request from 'supertest';
import { app } from '../../src/express';
import { config, database } from '../../src/dependencies';
import { User, UserRole } from '../../src/features/users/model';

describe('user feature', () => {
  beforeAll(async () => {
    config.dbName = 'easel_test';
    await database.initialize();
    await User.sync({ force: true });
  });

  beforeEach(async () => {
    await User.create({
      username: 'admin',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      hNumber: 'H00000000',
      role: UserRole.ADMIN
    });
  });

  afterEach(async () => {
    await User.truncate();
  });

  test('read user', async () => {
    let user = await User.create({
      username: 'jdoe',
      firstName: 'John',
      lastName: 'Doe',
      hNumber: 'H00000000',
      password: 'password',
      role: UserRole.STUDENT
    });
    await request(app)
      .get('/api/user' + user.id);
  });

  test('read users', async () => {
    await request(app)
      .get('/api/users/')
      .expect([]);
  });

  test('create user', async () => {
    await request(app)
      .post('/api/users/')
      .send({
        username: 'jdoe',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        role: 'ADMIN'
      });
  });

  test('register user', async () => {
    await request(app)
      .post('/api/users/')
      .send({
        username: 'jdoe',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        isRegister: true
      });
  });
});
