import { User, UserRole } from '../src/features/users/model';
import * as faker from 'faker';
import { Term, TermType } from '../src/features/terms/model';
import * as moment from 'moment';
import * as request from 'supertest';
import { app } from '../src/express';

export async function requestJwt (user: any) {
  return (await request(app)
    .post('/api/users/authentication/login')
    .send({
      username: user.username,
      password: user.password
    })).body.token;
}

export async function generateUserForEachRoleAndCreateInDatabase () {
  return {
    admin: await generateUserAndCreateInDatabase(UserRole.ADMIN),
    professor: await generateUserAndCreateInDatabase(UserRole.PROFESSOR),
    student: await generateUserAndCreateInDatabase(UserRole.STUDENT)
  };
}

export async function generateUserAndCreateInDatabase (role: UserRole) {
  const user = generateUserModelCreationData(role);
  return User.create(user);
}

export function generateTermAndCreateInDatabase (): any {
  const term = generateTermModelCreationData();
  return Term.create(term);
}

export function generateTermModelCreationData () {
  return {
    type: TermType.FALL,
    startDate: moment().startOf('minute').toDate(),
    endDate: moment().startOf('minute').add(1, 'month').toDate()
  };
}

export function generateUserModelCreationData (role: UserRole) {
  return {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    hNumber: generateHNumber(),
    role: role
  };
}

export function generateHNumber (): string {
  const min = 11111111;
  const max = 99999999;
  return 'H' + (Math.floor(Math.random() * (max - min + 1)) + min);
}
