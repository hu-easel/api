import { Router } from 'express';
import { authorizeAddUser, authorizeReadUser, authorizeUpdateUser, getUserFromParameter } from './middleware';
import { createUser, readUser, readUsers, updateUser, deleteUser } from './controller';
import authenticationRouter from './authentication/routes';
import { authenticate } from './authentication/middleware';
import { checkUserIsAuthorized } from './authorization/middleware';
import { UserRole } from './model';

const { PROFESSOR, ADMIN } = UserRole;

let router = Router();

router.param('user_uuid',
  getUserFromParameter);

router.post('/',
  authenticate(false),
  authorizeAddUser(),
  createUser);

router.get('/:user_uuid',
  authenticate(true),
  authorizeReadUser(),
  readUser);

router.get('/',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR),
  readUsers);

router.put('/:user_uuid',
  authenticate(true),
  authorizeUpdateUser(),
  updateUser);

router.delete('/:user_uuid',
  authenticate(true),
  checkUserIsAuthorized(ADMIN),
  deleteUser);

router.use('/authentication', authenticationRouter);

export default router;
