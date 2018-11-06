import { Request, Response, NextFunction } from 'express';
import { ExpressError } from '../../../middleware';

export function validateCreateContentRequest (req: Request, res: Response, next: NextFunction) {
  let { name } = req.body;
  if (name) {
    next();
  } else {
    next(new ExpressError('Invalid request', 422));
    return;
  }
}
