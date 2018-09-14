import { Request, Response, NextFunction } from 'express';
import { UserModel } from './model';

export async function getUserFromParameter (req: Request, res: Response, next: NextFunction, username: string) {
  try {
    let user = await UserModel.findOne({
      where: {
        username: username
      }
    });
    if (user) {
      res.locals.user = user;
      next();
    } else {
      next({
        statusCode: 404,
        error: 'User not found'
      });
    }
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
  }
}
