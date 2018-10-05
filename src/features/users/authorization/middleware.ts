import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../model';
const { STUDENT, PROFESSOR, ADMIN } = UserRole;

export function checkUserIsAuthorized (requiredRole: UserRole) {
  return async function (req: Request, res: Response, next: NextFunction) {
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
