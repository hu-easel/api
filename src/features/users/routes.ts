import { Router } from 'express';
import { getUserFromParameter } from './middleware';
import { addUser, readUser, readUsers, updateUser, deleteUser } from './controller';

let router = Router();

router.param('username', getUserFromParameter);

router.post('/', addUser);
router.get('/:username', readUser);
router.get('/', readUsers);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;
