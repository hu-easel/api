// import { config, database } from '../../dependencies';
// import { User, UserRole } from './model';
//
// const { STUDENT } = UserRole;
//
// describe('user model', () => {
//   let validUser = {
//     firstName: 'John',
//     lastName: 'Doe',
//     username: 'jdoe',
//     hNumber: 'H00000000',
//     password: 'password',
//     role: STUDENT
//   };
//
//   beforeAll(async () => {
//     config.dbName = 'easel_test';
//     await database.initialize();
//     await User.sync({ force: true });
//   });
//
//   afterEach(async () => {
//     await User.truncate();
//   });
//
//   afterAll(async () => {
//     await database.close();
//   });
//
//   test('valid user is created', async () => {
//     let user = new User({
//       ...validUser
//     });
//
//     let { password, ...eveythingElse } = validUser;
//     expect(user).toMatchObject(eveythingElse);
//     console.log(user.password);
//     console.log(await user.validatePassword(password));
//   });
// });
