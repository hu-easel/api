import * as request from 'supertest';
import { app } from '../../src/express';
import { config, database } from '../../src/dependencies';
import { User, UserRole } from '../../src/features/users/model';

describe('test the user feature', () => {
  beforeAll(async () => {
    config.dbName = 'easel_test';
    await database.initialize();
    await User.sync({ force: true });
  });

  afterEach(async () => {
    await User.truncate();
  });

  test('it should return a single user', async () => {
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

  test('read (list)', async () => {
    await request(app)
      .get('/api/users/')
      .expect([]);
  });

  test('create', async () => {
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

  test('create (register)', async () => {
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
