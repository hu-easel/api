import { Request, Response, NextFunction } from 'express';

export function checkUserIsAuthorized (requiredRole: string) {
  return async function (req: Request, res: Response, next: NextFunction) {
    next();
  };
}
