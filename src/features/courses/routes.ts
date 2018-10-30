import { Router } from 'express';
import { getCourseFromParameter } from './middleware';
import { authenticate } from '../users/authentication/middleware';
import { checkUserIsAuthorized } from '../users/authorization/middleware';
import { UserRole } from '../users/model';
import {
  createCourse,
  deleteCourse,
  readCourse,
  readCourses,
  updateCourse,
  validateCreateCourseRequest
} from './controller';

let router = Router();

const { PROFESSOR } = UserRole;

router.param('course_uuid',
  getCourseFromParameter);

router.post('/',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'CREATE', 'COURSE/*'),
  validateCreateCourseRequest,
  createCourse);

router.get('/:course_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'READ', 'COURSE/*'),
  readCourse);

router.get('/',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'READ', 'COURSE/*'),
  readCourses);

router.put('/:course_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'UPDATE', 'COURSE/*'),
  updateCourse);

router.delete('/course_uuid',
  authenticate(true),
  checkUserIsAuthorized(PROFESSOR, 'DELETE', 'COURSE/*'),
  deleteCourse);

export default router;
