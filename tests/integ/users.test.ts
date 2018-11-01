import * as request from 'supertest';
import { app } from '../../src/express';
import { config, database } from '../../src/dependencies';
import { User, UserRole } from '../../src/features/users/model';

describe('users feature', () => {
  let jwt: string;
  let adminUser = {
    username: 'admin',
    firstName: 'admin',
    lastName: 'admin',
    password: 'admin',
    hNumber: 'H00000000',
    role: UserRole.ADMIN
  };

  beforeAll(async () => {
    config.dbName = 'easel_test';
    await database.initialize();
    await User.sync();
  });

  beforeEach(async () => {
    await User.create(adminUser);
    jwt = (await request(app)
      .post('/api/users/authentication/login')
      .send({
        username: 'admin',
        password: 'admin'
      })).body.token;
  });

  afterAll(async () => {
    await database.close();
  });

  test('read user', async () => {
    let user = await User.create({
      username: 'jdoe',
      firstName: 'John',
      lastName: 'Doe',
      hNumber: 'H00000001',
      password: 'password',
      role: UserRole.STUDENT
    });
    await request(app)
      .get('/api/user' + user.id)
      .set('Authorization', 'Bearer ' + jwt);
  });

  test('read users', async () => {
    let res = await request(app)
      .get('/api/users/')
      .set('Authorization', 'Bearer ' + jwt);
    let { body } = res;
    expect(body.length).toBe(1);
    expect(body[0].username).toBe(adminUser.username);
    expect(body[0].firstName).toBe(adminUser.firstName);
    expect(body[0].lastName).toBe(adminUser.lastName);
    expect(body[0].role).toBe(adminUser.role);
  });

  test('create user', async () => {
    // TODO add assertions
    await request(app)
      .post('/api/users/')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        username: 'jdoe',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000001',
        role: UserRole.STUDENT
      });
  });

  test('register user', async () => {
    // TODO add assertions
    await request(app)
      .post('/api/users/')
      .send({
        username: 'jdoe',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000001',
        isRegister: true,
        role: 'STUDENT'
      });
  });
});
