import userRouter from './features/users/routes';
import { Router } from 'express';

let router = Router();

router.use('/users', userRouter);

export default router;
