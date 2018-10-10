import * as dependencies from '../../dependencies';
import * as model from './model';
import { createUser, readUser, readUsers, updateUser, deleteUser } from './controller';
import * as uuidv4 from 'uuid/v4';

const { UserRole } = model;
const { STUDENT, ADMIN } = UserRole;
const { User } = model as any;
const { config } = dependencies;

describe('user controller', () => {
  describe('register user', () => {
    let req: any;
    let res: any;
    let next: any;

    let user: any;
    let expectedResponse: any;

    beforeEach(() => {
      User.create = jest.fn((user) => {
        return {
          ...user,
          uuid: uuidv4()
        };
      });
      config.registrationEnabled = true;

      req = {
        body: {
          isRegister: true
        }
      };
      res = {
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);

      user = {
        uuid: uuidv4(),
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: STUDENT
      };

      expectedResponse = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };

      req.body = {
        ...req.body,
        ...user
      };
    });

    test('creates user', async () => {
      await createUser(req, res, next);

      expect(User.create).toBeCalled();
      expect(res.json).toBeCalled();
      expect(next).not.toBeCalled();

      let actualResponse = res.json.mock.calls[0][0];
      expect(actualResponse).toMatchObject(expectedResponse);
    });

    test('creates user with student role when no role is specified in request', async () => {
      delete req.body.role;

      await createUser(req, res, next);

      let actualResponse = res.json.mock.calls[0][0];

      expect(User.create).toBeCalled();
      expect(res.json).toBeCalled();
      expect(next).not.toBeCalled();

      expect(actualResponse).toMatchObject(expectedResponse);
    });

    test('creates user with student role when different role is specified in request', async () => {
      req.body.role = ADMIN;

      await createUser(req, res, next);

      let actualResponse = res.json.mock.calls[0][0];
      expect(actualResponse.role).toBe(STUDENT);
    });

    test('500 is sent when model throw error', async () => {
      User.create = jest.fn(() => {
        throw Error();
      });

      await createUser(req, res, next);

      expect(User.create).toBeCalled();
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalled();

      let nextArgument = next.mock.calls[0][0];
      expect(nextArgument.statusCode).toBe(500);
    });

    test('403 is sent when registration is disabled', async () => {
      config.registrationEnabled = false;

      await createUser(req, res, next);

      expect(User.create).not.toBeCalled();
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalled();

      let nextArgument = next.mock.calls[0][0];
      expect(nextArgument.statusCode).toBe(403);
    });
  });

  describe('create user', () => {
    let req: any;
    let res: any;
    let next: any;

    let user: any;
    let expectedResponse: any;

    beforeEach(() => {
      User.create = jest.fn((user) => {
        return {
          ...user,
          uuid: uuidv4()
        };
      });
      config.registrationEnabled = true;

      req = {
        body: {
        }
      };
      res = {
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);

      user = {
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: STUDENT
      };

      expectedResponse = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };

      req.body = {
        ...req.body,
        ...user
      };
    });

    test('creates user', async () => {
      await createUser(req, res, next);

      expect(User.create).toBeCalled();
      expect(res.json).toBeCalled();
      expect(next).not.toBeCalled();

      let actualResponse = res.json.mock.calls[0][0];
      expect(actualResponse).toMatchObject(expectedResponse);
    });
  });

  describe('read users', () => {
    let req: any;
    let res: any;
    let next: any;

    let users = [
      {
        uuid: uuidv4(),
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        role: STUDENT
      },
      {
        uuid: uuidv4,
        username: 'jblow',
        firstName: 'Joe',
        lastName: 'Blow',
        role: STUDENT
      }
    ];

    beforeEach(() => {
      User.findAll = jest.fn(() => users);
      req = {};
      res = {
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);
    });

    test('sends users', async () => {
      await readUsers(req, res, next);

      expect(User.findAll).toBeCalled();
      expect(res.json).toBeCalledWith(users);
      expect(next).not.toBeCalled();
    });
  });

  describe('read user', () => {
    let req: any;
    let res: any;
    let next: any;

    let user: any;

    beforeEach(() => {
      req = {};
      res = {
        locals: {
        },
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);

      user = {
        uuid: uuidv4(),
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: STUDENT
      };
    });

    test('sends user', async () => {
      res.locals.user = user;

      await readUser(req, res, next);

      expect(res.json).toBeCalledWith(user);
      expect(next).not.toBeCalled();
    });
  });

  describe('update user', () => {
    let req: any;
    let res: any;
    let next: any;

    let user: any;

    beforeEach(() => {
      req = {
        body: {
          firstName: 'Joe',
          lastName: 'Blow',
          hNumber: 'H11111111',
          username: 'jblow',
          password: 'newPassword',
          role: ADMIN
        }
      };
      res = {
        locals: {
          user
        },
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);

      user = {
        uuid: uuidv4(),
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: STUDENT,
        update: jest.fn(async () => null)
      };
    });

    test('updates user', async () => {
      await updateUser(req, res, next);

      expect(user.update).toBeCalled();
      expect(res.json).toBeCalledWith(user);
      expect(next).not.toBeCalled();
    });
  });

  describe('delete user', () => {
    let req: any;
    let res: any;
    let next: any;

    let user: any;

    beforeEach(() => {
      req = {};
      res = {
        locals: {
          user
        },
        json: jest.fn(() => null)
      };
      next = jest.fn(() => null);

      user = {
        uuid: uuidv4(),
        username: 'jdoe',
        firstName: 'John',
        lastName: 'Doe',
        hNumber: 'H00000000',
        password: 'password',
        role: STUDENT,
        destroy: jest.fn(async () => null)
      };
    });

    test('deletes user', async () => {
      await deleteUser(req, res, next);

      expect(user.destroy).toBeCalled();
      expect(res.json).toBeCalledWith(user);
      expect(next).not.toBeCalled();
    });
  });
});
