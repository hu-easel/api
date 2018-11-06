import { Router } from 'express';
import contentsRouter from './contents/routes';
import listingRouter from './listings/routes';

let router = Router();

router.use('/contents', contentsRouter);
router.use('/listings', listingRouter);

export default router;
