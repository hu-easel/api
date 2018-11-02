import { Router } from 'express';
import listingRouter from './listing/routes';

let router = Router();

router.use('/listings', listingRouter);

export default router;
