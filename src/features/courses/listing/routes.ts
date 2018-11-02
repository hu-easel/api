import { Router } from 'express';
import { getListingFromParameter } from './middleware';
import { authenticate } from '../../users/authentication/middleware';
import { checkUserIsAuthorized } from '../../users/authorization/middleware';
import { UserRole } from '../../users/model';
import {
  createListing,
  deleteListing,
  readListing,
  readListings,
  updateListing,
  validateCreateListingRequest
} from './controller';

let router = Router();

const { PROFESSOR } = UserRole;

router.param('listing_uuid',
  getListingFromParameter);

router.post('/',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'CREATE', 'LISTING/*'),
  validateCreateListingRequest,
  createListing);

router.get('/:listing_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'READ', 'LISTING/*'),
  readListing);

router.get('/',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'READ', 'LISTING/*'),
  readListings);

router.put('/:listing_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'UPDATE', 'LISTING/*'),
  updateListing);

router.delete('/listing_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'DELETE', 'LISTING/*'),
  deleteListing);

export default router;
