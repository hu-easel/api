import userRouter from './users/routes';
import { Router } from 'express';

let router = Router();

router.use('/users', userRouter);

export default router;
