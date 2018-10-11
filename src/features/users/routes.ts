import { Router } from 'express';
import { authorizeAddUser, authorizeReadUser, authorizeUpdateUser, getUserFromParameter } from './middleware';
import { createUser, readUser, readUsers, updateUser, deleteUser } from './controller';
import authenticationRouter from './authentication/routes';
import { authenticate } from './authentication/middleware';
import { checkUserIsAuthorized } from './authorization/middleware';
import { UserRole } from './model';
const { PROFESSOR, ADMIN } = UserRole;

let router = Router();

router.param('username', getUserFromParameter);

router.post('/', authorizeAddUser, createUser);
router.get('/:username', authenticate, authorizeReadUser, readUser);
router.get('/', authenticate, checkUserIsAuthorized(PROFESSOR), readUsers);
router.put('/:username', authenticate, authorizeUpdateUser, updateUser);
router.delete('/:username', authenticate, checkUserIsAuthorized(ADMIN), deleteUser);

router.use('/login', authenticationRouter);

export default router;
