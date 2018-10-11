import { NextFunction, Request, Response } from 'express';
import { authenticate } from './authentication/middleware';
import { User, UserRole } from './model';
import { ExpressError } from '../../middleware';
import { checkUserIsAuthorized } from './authorization/middleware';

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
    checkUserIsAuthorized(UserRole.ADMIN)(req, res, next);
  } else {
    next();
  }
}

export async function authorizeReadUser (req: Request, res: Response, next: NextFunction) {
  let userToRead = res.locals.user;
  let authenticatedUser = res.locals.auth.user;
  if (userToRead.uuid === authenticatedUser.uuid) {
    next();
  } else {
    checkUserIsAuthorized(UserRole.PROFESSOR)(req, res, next);
  }
}

export async function authorizeUpdateUser (req: Request, res: Response, next: NextFunction) {
  let { role, hNumber } = req.body;
  if (role || hNumber) {
    checkUserIsAuthorized(UserRole.ADMIN)(req, res, next);
    return;
  }

  let userToUpdate = res.locals.user;
  let authenticatedUser = res.locals.auth.user;
  if (userToUpdate.uuid === authenticatedUser.uuid) {
    next();
  } else {
    checkUserIsAuthorized(UserRole.ADMIN)(req, res, next);
  }
}
