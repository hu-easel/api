import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config, database } from '../../../dependencies';

export async function authenticate (req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!config.authenticationEnabled) {
    next();
    return;
  }
  let token: any = req.header('Authorization') as string;
  if (!token) {
    next({
      status: 400,
      error: 'No token sent in request'
    });
    return;
  }
  try {
    token = await jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer
    });
    try {
      let user = await database.UserModel.findById(token.id);
      res.locals.auth = {
        user
      };
      if (user === null) {
        next({
          status: 400,
          error: 'Invalid authentication token. User does not exist.'
        });
      }
      next();
    } catch (err) {
      next({
        status: 400,
        error: err
      });
    }
  } catch (err) {
    next({
      status: 400,
      error: err
    });
  }
}
