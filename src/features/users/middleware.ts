import { NextFunction, Request, Response } from 'express';
import { authenticate } from './authentication/middleware';
import { User, UserRole } from './model';
import { ExpressError } from '../../middleware';
import { checkUserIsAuthorized } from './authorization/middleware';

export async function getUserFromParameter (req: Request, res: Response, next: NextFunction, userUuid: string) {
  try {
    let user: User | null = await User.findOne({
      where: {
        uuid: userUuid
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

/**
 * Require that a user be an admin if registration is not enabled
 */
export async function authorizeAddUser (req: Request, res: Response, next: NextFunction) {
  if (!req.body.register) {
    await authenticate(req, res, next);
    checkUserIsAuthorized(UserRole.ADMIN)(req, res, next);
  } else {
    next();
  }
}

/**
 * Require that the user is an admin if reading a user other than themself
 */
export async function authorizeReadUser (req: Request, res: Response, next: NextFunction) {
  let targetUser = res.locals.user;
  let authenticatedUser = res.locals.auth.user;
  if (targetUser.uuid === authenticatedUser.uuid) {
    next();
  } else {
    checkUserIsAuthorized(UserRole.PROFESSOR)(req, res, next);
  }
}

/**
 * Require the user is an admin if changing a user's role or hNumber, or updating another user
 */
export async function authorizeUpdateUser (req: Request, res: Response, next: NextFunction) {
  let { role, hNumber } = req.body;
  let targetUser = res.locals.user;
  let authenticatedUser = res.locals.auth.user;

  if (role || hNumber || targetUser.uuid !== authenticatedUser.uuid) {
    checkUserIsAuthorized(UserRole.ADMIN)(req, res, next);
  } else {
    next();
  }
}
