import { Request, Response, NextFunction, RequestHandler } from 'express';
import { User, UserRole } from '../model';
import { config } from '../../../dependencies';
import { ExpressError } from '../../../middleware';
const { STUDENT, PROFESSOR, ADMIN } = UserRole;

let UserRoleValues = {
  [STUDENT]: 0,
  [PROFESSOR]: 1,
  [ADMIN]: 2
};

export function checkUserIsAuthorized (requiredRole: UserRole, action?: string, resource?: string): RequestHandler {
  return checkAuthorizationIsEnabled(async function (req: Request, res: Response, next: NextFunction) {
    let { role } = res.locals.auth.user as User;

    if (UserRoleValues[requiredRole] >= UserRoleValues[role]) {
      next();
    } else {
      if (action && resource) {
        next(new ExpressError('You must be a ' + requiredRole + ' to ' + action + ' ' + resource, 400));
      }
      next(new ExpressError('You are not authorized to do that', 400));
    }
  });
}

export function checkAuthorizationIsEnabled (middleware: RequestHandler): RequestHandler {
  if (config.isAuthorizationEnabled) {
    return middleware;
  } else {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  }
}
