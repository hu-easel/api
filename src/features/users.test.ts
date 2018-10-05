import * as request from 'supertest';
import { app } from '../express';
import { database } from '../dependencies';

describe('user', () => {
  beforeAll(async () => {
    await database.initialize();
  });

  beforeEach(async () => {
    await database.UserModel.sync({ force: true });
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
