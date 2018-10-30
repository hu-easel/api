import { NextFunction, Request, Response } from 'express';
import { ExpressError } from '../../middleware';
import { Course } from './model';
import { CourseResponseLocals } from './types';

interface CreateCourseRequest {
  department: string;
  identifier: number;
}

export function validateCreateCourseRequest (req: Request, res: Response, next: NextFunction) {
  let { department, identifier } = req.body;
  if (department && identifier) {
    next();
  } else {
    next(new ExpressError('Invalid request', 422));
    return;
  }
}

export async function createCourse (req: Request, res: Response, next: NextFunction) {
  let { department, identifier } = req.body as CreateCourseRequest;
  try {
    let course = Course.create({
      department,
      identifier
    });
    res.json(course);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function readCourse (req: Request, res: Response, next: NextFunction) {
  let { courseParam } = res.locals as CourseResponseLocals;
  res.json(courseParam);
}

export async function readCourses (req: Request, res: Response, next: NextFunction) {
  try {
    let courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

interface UpdateCourseRequest {
  department?: string;
  identifier?: number;
}

export async function updateCourse (req: Request, res: Response, next: NextFunction) {
  // TODO can this line be cleaned up?
  let course = (res.locals as CourseResponseLocals).courseParam as Course;
  let { department, identifier } = req.body as UpdateCourseRequest;
  if (department) course.department = department;
  if (identifier) course.identifier = identifier;
  try {
    await course.save();
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function deleteCourse (req: Request, res: Response, next: NextFunction) {
  let course = (res.locals as CourseResponseLocals).courseParam as Course;
  try {
    await course.destroy();
    res.json(course);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}
