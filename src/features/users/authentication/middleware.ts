import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../dependencies';
import { User } from '../model';
import { ExpressError } from '../../../middleware';

export async function authenticate (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!config.authenticationEnabled) {
    next();
    return;
  }
  let token: any = req.header('Authorization') as string;
  if (!token) {
    next(new ExpressError('No jwt sent it request', 400));
    return;
  }
  try {
    token = await jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer
    });
    try {
      let user = await User.findById(token.uuid);
      res.locals.auth = {
        user
      };
      if (user === null) {
        next(new ExpressError('Invalid jwt; user does not exist', 400));
      }
      next();
    } catch (err) {
      next(new ExpressError(err, 400));
    }
  } catch (err) {
    next(new ExpressError(err, 400));
  }
}
