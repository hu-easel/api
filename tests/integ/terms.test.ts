import { User } from '../../src/features/users/model';
import { config, database } from '../../src/dependencies';
import * as request from 'supertest';
import { app } from '../../src/express';
import { Term } from '../../src/features/terms/model';
import { generateTermAndCreateInDatabase, generateUserForEachRoleAndCreateInDatabase, requestJwt } from '../utils';
import * as log from 'loglevel';

describe('terms feature', () => {
  let testUsers;
  const userJwts = {
    admin: ''
  };

  beforeAll(async () => {
    log.setLevel(log.levels.INFO);
    config.dbName = 'easel_test';
    await database.initialize();
    await User.sync();
    await Term.sync();

    testUsers = await generateUserForEachRoleAndCreateInDatabase();
    userJwts.admin = await requestJwt(testUsers.admin);
    console.error(userJwts);
  });

  afterAll(async () => {
    await database.close();
  });

  test('read term', async () => {
    let term = await generateTermAndCreateInDatabase();

    let res = await request(app)
      .get('/api/terms/' + term.uuid)
      .set('Authorization', 'Bearer ' + userJwts.admin);

    let { uuid, type, startDate, endDate } = res.body;
    expect(uuid).toBe(term.uuid);
    expect(type).toBe(term.type);
    expect(startDate).toBe(term.startDate.toISOString());
    expect(endDate).toBe(term.endDate.toISOString());

    await term.destroy();
  });
});
