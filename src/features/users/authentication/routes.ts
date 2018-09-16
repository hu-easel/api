import { Router } from 'express';
import { login } from './controller';

let router = Router();

router.post('/login', login);

export default router;
