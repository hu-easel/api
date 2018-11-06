import { Router } from 'express';
import listingRouter from './listings/routes';

let router = Router();

router.use('/listings', listingRouter);

export default router;
