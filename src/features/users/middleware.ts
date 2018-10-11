import { Request, Response, NextFunction } from 'express';
import { authenticate } from './authentication/middleware';
import { User } from './model';
import { ExpressError } from '../../middleware';

export async function getUserFromParameter (req: Request, res: Response, next: NextFunction, username: string) {
  try {
    let user = await User.findOne({
      where: {
        username: username
      }
    });
    if (user) {
      res.locals.user = user;
      next();
    } else {
      next(new ExpressError('User not found', 404));
    }
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function authorizeAddUser (req: Request, res: Response, next: NextFunction) {
  if (!req.body.register) {
    await authenticate(req, res, next);
    // TODO check authorization
  } else {
    next();
  }
}
