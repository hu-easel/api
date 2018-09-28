import { App } from '../../App';
import { UserRole } from './model';

describe('user model', () => {

  beforeAll(() => {
    App.db.initialize('test', 'testuser', 'testpasswd');
  });

  test('hashes password on save', async() => {
    const user = await App.db.UserModel.create({
      firstName: 'Joe',
      lastName: 'Blow',
      username: 'jblow',
      hNumber: 'H12345678',
      password: 'secret',
      role: UserRole.student,
    });

    expect(user.get('password')).toBe('secret');
  });

});
