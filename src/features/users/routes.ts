import { Router } from 'express';
import { authorizeAddUser, getUserFromParameter } from './middleware';
import { addUser, readUser, readUsers, updateUser, deleteUser } from './controller';
import authenticationRouter from './authentication/routes';
import { authenticate } from './authentication/middleware';
import { checkUserIsAuthorized } from './authorization/middleware';

let router = Router();

router.param('username', getUserFromParameter);

router.post('/', authorizeAddUser, addUser);
router.get('/:username', authenticate, readUser);
router.get('/', authenticate, checkUserIsAuthorized('PROFESSOR'), readUsers);
router.put('/:username', authenticate, updateUser);
router.delete('/:username', authenticate, checkUserIsAuthorized('ADMIN'), deleteUser);

router.use('/login', authenticationRouter);

export default router;
