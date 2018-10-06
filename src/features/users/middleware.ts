import { Request, Response, NextFunction } from 'express';
import { authenticate } from './authentication/middleware';
import { User } from './model';

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
      next({
        statusCode: 404,
        error: 'User not found'
      });
    }
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
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
