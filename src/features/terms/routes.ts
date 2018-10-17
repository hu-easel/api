import { Router } from 'express';
import { authenticate } from '../users/authentication/middleware';
import { checkUserIsAuthorized } from '../users/authorization/middleware';
import { UserRole } from '../users/model';
import { getTermFromParameter } from './middleware';
import { createTerm, deleteTerm, readTerm, readTerms, updateTerm, validateCreateTermRequest } from './controller';

const { ADMIN } = UserRole;

let router = Router();

router.param('term_uuid',
  getTermFromParameter);

router.post('/',
  authenticate(true),
  checkUserIsAuthorized(ADMIN, 'CREATE', 'TERM/*'),
  validateCreateTermRequest,
  createTerm);

router.get('/:term_uuid',
  authenticate(true),
  checkUserIsAuthorized(ADMIN, 'READ', 'TERM/*'),
  readTerm);

router.get('/',
  authenticate(true),
  checkUserIsAuthorized(ADMIN, 'READ', 'TERM/*'),
  readTerms);

router.put('/:term_uuid',
  authenticate(true),
  checkUserIsAuthorized(ADMIN, 'UPDATE', 'TERM/*'),
  updateTerm);

router.delete('/:term_uuid',
  authenticate(true),
  checkUserIsAuthorized(ADMIN, 'DELETE', 'TERM/*'),
  deleteTerm);
