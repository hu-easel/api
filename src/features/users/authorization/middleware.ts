import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../model';
import { config } from '../../../dependencies';
const { STUDENT, PROFESSOR, ADMIN } = UserRole;

export function checkUserIsAuthorized (requiredRole: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (!config.authorizationEnabled) {
      next();
      return;
    }
    let { role } = res.locals.auth.user;
    switch (requiredRole) {
      case STUDENT:
        next();
        break;
      case PROFESSOR:
        if (role === PROFESSOR || role === ADMIN) {
          next();
        }
        break;
      case ADMIN:
        if (role === ADMIN) {
          next();
        }
        break;
    }
  };
}
