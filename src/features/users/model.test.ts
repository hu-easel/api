import app from '../../app';
import { UserRole } from './model';

describe('user model', () => {

  beforeAll(() => {
    app.database.initialize('test', 'testuser', 'testpasswd');
  });

  test('hashes password on save', async () => {
    const user = await app.database.UserModel.create({
      firstName: 'Joe',
      lastName: 'Blow',
      username: 'jblow',
      hNumber: 'H12345678',
      password: 'secret',
      role: UserRole.STUDENT
    });

    expect(user.get('password')).toBe('secret');
  });

});
