import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../../config';
import { App } from '../../../App';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  let token: any = req.header('Authorization') as string;
  if (!token) {
    next({
      status: 400,
      error: 'No token sent in request',
    });
    return;
  }
  try {
    token = await jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer,
    });
    try {
      let user = await App.db.UserModel.findById(token.id);
      res.locals.auth = {
        user,
      };
      if (user === null) {
        next({
          status: 400,
          error: 'Invalid authentication token. User does not exist.',
        });
      }
      next();
    }
    catch (err) {
      next({
        status: 400,
        error: err,
      });
    }
  }
  catch (err) {
    next({
      status: 400,
      error: err,
    });
  }
}
