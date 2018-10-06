import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../dependencies';
import { User } from '../model';

export async function login (req: Request, res: Response, next: NextFunction) {
  let { username, password } = req.body;

  try {
    let user = await User.findOne({
      where: {
        username: username
      }
    });

    if (user) {
      if (await user.validatePassword(password)) {
        res.locals.user = user;
        await sendJwt(req, res, next);
      } else {
        next({
          status: 401,
          error: {
            name: 'Invalid password'
          }
        });
      }
    } else {
      next({
        status: 404,
        error: {
          name: 'User not found'
        }
      });
    }
  } catch (err) {
    next({
      status: 500,
      error: err
    });
  }
}

async function sendJwt (req: Request, res: Response, next: NextFunction) {
  let user = res.locals.user;
  let { uuid, firstName, lastName, email } = user;
  let token = jwt.sign({
    uuid,
    firstName,
    lastName,
    email
  }, config.jwtSecret, {
    issuer: config.jwtIssuer
  });
  res.json({ 'token': token });
}
