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
    next();
    return;
  }
  try {
    token = await jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer
    });
    try {
      let user = await User.findById(token.uuid);
      console.log('authentication');
      console.log(user);
      res.locals.auth = {
        user: user
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
