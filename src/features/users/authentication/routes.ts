import { Router } from 'express';
import { loadCandidateUser, validateCandidatePassword, validateLoginRequest, sendJwt } from './controller';
import { initLocals } from './middleware';

let router = Router();

router.use('/',
  initLocals
);

router.post('/login',
  validateLoginRequest,
  loadCandidateUser,
  validateCandidatePassword,
  sendJwt
);

export default router;
