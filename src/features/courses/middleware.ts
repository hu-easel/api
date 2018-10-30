import { NextFunction, Request, Response } from 'express';
import { Course } from './model';
import { ExpressError } from '../../middleware';
import { CourseResponseLocals } from './types';

export async function getCourseFromParameter (req: Request, res: Response, next: NextFunction, courseUuid: string) {
  let locals = res.locals as CourseResponseLocals;
  try {
    let course: Course | null = await Course.findOne({
      where: {
        uuid: courseUuid
      }
    });
    if (course) {
      locals.courseParam = course;
      next();
    } else {
      next(new ExpressError('Course not found', 404));
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}
