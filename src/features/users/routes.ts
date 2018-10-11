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
  authorizeAddUser,
  createUser);

router.get('/:user_uuid',
  authenticate,
  authorizeReadUser,
  readUser);

router.get('/',
  authenticate,
  checkUserIsAuthorized(PROFESSOR),
  readUsers);

router.put('/:user_uuid',
  authenticate,
  authorizeUpdateUser,
  updateUser);

router.delete('/:user_uuid',
  authenticate,
  checkUserIsAuthorized(ADMIN),
  deleteUser);

router.use('/login', authenticationRouter);

export default router;
