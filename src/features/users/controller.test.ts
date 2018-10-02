import * as dependencies from '../../dependencies';
import { createUser, readUser, readUsers } from './controller';

let { config, database } = dependencies as any;

jest.mock('../../dependencies', () => {
  return {
    database: {
      UserModel: {}
    },
    config: {}
  };
});

describe('user controller - read many', () => {
  let req: any;
  let res: any;
  let next: any;

  let users = [
    {
      username: 'jdoe',
      firstName: 'John',
      lastName: 'Doe',
      role: 'STUDENT'
    },
    {
      username: 'jblow',
      firstName: 'Joe',
      lastName: 'Blow',
      role: 'STUDENT'
    }
  ];

  beforeEach(() => {
    database.UserModel.findAll = jest.fn(() => users);
    req = {};
    res = {
      send: jest.fn(() => null)
    };
    next = jest.fn(() => null);
  });

  test('can read data for multiple users', async () => {
    await readUsers(req, res, next);

    let receivedUsers = res.send.mock.calls[0][0];
    expect(receivedUsers).toBe(users);
  });
});

describe('user controller - read one', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {};
    res = {
      send: jest.fn(() => null)
    };
  });

  test('can read data for single user', async () => {
    res.locals = {
      user: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        role: 'STUDENT'
      }
    };

    await readUser(req, res, next);

    let user = res.send.mock.calls[0][0];
    expect(user.username).toBe('jdoe');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.role).toBe('STUDENT');
  });
});

describe('user controller - create', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    database.UserModel.create = jest.fn((user) => user);
    config.registrationEnabled = true;
    req = {};
    res = {
      send: jest.fn(() => null)
    };
    next = jest.fn(() => null);
  });

  test('can register new account when registration is enabled', async () => {
    req = {
      body: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        isRegister: true
      }
    };

    await createUser(req, res, next);

    expect(database.UserModel.create.mock.calls.length).toBe(1);
    expect(res.send.mock.calls.length).toBe(1);

    let user = res.send.mock.calls[0][0];
    expect(user.username).toBe('jdoe');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
  });

  test('role when registering without role defaults to student', async () => {
    req = {
      body: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        isRegister: true
      }
    };

    await createUser(req, res, next);

    let user = res.send.mock.calls[0][0];
    expect(user.role).toBe('STUDENT');
  });

  test('role when registering with is overridden to student', async () => {
    req = {
      body: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: 'ADMIN',
        isRegister: true
      }
    };

    await createUser(req, res, next);

    let user = res.send.mock.calls[0][0];
    expect(user.role).toBe('STUDENT');
  });

  test('500 is sent when model throw error', async () => {
    req = {
      body: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password'
      }
    };

    database.UserModel.create = jest.fn(() => {
      throw Error();
    });

    await createUser(req, res, next);

    expect(next.mock.calls.length).toBe(1);

    let nextArgument = next.mock.calls[0][0];
    expect(nextArgument.statusCode).toBe(500);
  });

  test('cannot register new account when registration is disabled', async () => {
    req = {
      body: {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        isRegister: true
      }
    };

    config.registrationEnabled = false;

    await createUser(req, res, next);

    expect(next.mock.calls.length).toBe(1);

    let nextArgument = next.mock.calls[0][0];
    expect(nextArgument.statusCode).toBe(403);
  });
});
