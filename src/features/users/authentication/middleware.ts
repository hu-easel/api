import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../dependencies';
import { User } from '../model';
import { ExpressError } from '../../../middleware';

export function initLocals (req: Request, res: Response, next: NextFunction) {
  res.locals.authentication = {
  };
  next();
}

export function authenticate (required: boolean): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!config.isAuthenticationEnabled) {
      next();
      return;
    }
    let token: any = req.header('Authorization') as string;
    if (!token) {
      if (required) {
        next(new ExpressError('No jwt sent with request', 401));
      } else {
        next();
      }
      return;
    }
    token = token.replace('Bearer ', '');
    try {
      token = await
        jwt.verify(token, config.jwtSecret, {
          issuer: config.jwtIssuer
        });
      try {
        let user = await User.findById(token.uuid);
        res.locals.auth = {
          user: user
        };
        if (user === null) {
          next(new ExpressError('Invalid jwt; user does not exist', 401));
        }
        next();
      } catch (err) {
        next(new ExpressError(err, 400));
      }
    } catch (err) {
      next(new ExpressError(err, 400));
    }
  };
}
