import { Router } from 'express';
import { getUserFromParameter } from './middleware';
import { addUser, readUser, readUsers, updateUser, deleteUser } from './controller';
import authenticationRouter from './authentication/routes';
import { authenticate } from './authentication/middleware';

let router = Router();

router.param('username', getUserFromParameter);

router.post('/', authenticate, addUser);
router.get('/:username', authenticate, readUser);
router.get('/', authenticate, readUsers);
router.put('/:username', authenticate, updateUser);
router.delete('/:username', authenticate, deleteUser);

router.use('/login', authenticationRouter);

export default router;
