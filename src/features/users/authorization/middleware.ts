import { Request, Response, NextFunction } from 'express';
import { User, UserRole } from '../model';
import { config } from '../../../dependencies';
import { ExpressError } from '../../../middleware';
const { STUDENT, PROFESSOR, ADMIN } = UserRole;

let UserRoleValues = {
  [STUDENT]: 0,
  [PROFESSOR]: 1,
  [ADMIN]: 2
};

export function checkUserIsAuthorized (requiredRole: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!config.authorizationEnabled) {
      next();
      return;
    }

    let { role } = res.locals.auth.user as User;

    if (UserRoleValues[requiredRole] >= UserRoleValues[role]) {
      next();
    } else {
      next(new ExpressError('You are not authorized to do that', 400));
    }
  };
}
