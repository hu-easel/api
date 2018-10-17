import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../../dependencies';
import { User } from '../model';
import { ExpressError } from '../../../middleware';
import { AuthenticationResponseLocals } from './types';

const { jwtSecret, jwtIssuer } = config;

interface LoginRequest {
  username: string;
  password: string;
}

export function validateLoginRequest (req: Request, res: Response, next: NextFunction) {
  let { username, password } = req.body;
  if (!username || !password) {
    next(new ExpressError('Username or password not sent in request', 400));
    return;
  } else {
    next();
  }
}

export async function loadCandidateUser (req: Request, res: Response, next: NextFunction) {
  let locals: AuthenticationResponseLocals = res.locals.authentication;
  let loginRequest: LoginRequest = req.body;
  let user: User | null;

  try {
    user = await User.findOne({
      where: {
        username: loginRequest.username
      }
    });
  } catch (err) {
    next(new ExpressError(err, 500));
    return;
  }

  if (user) {
    locals.candidateUser = user;
    next();
  } else {
    next(new ExpressError('User not found', 404));
  }
}

export async function validateCandidatePassword (req: Request, res: Response, next: NextFunction) {
  let loginRequest: LoginRequest = req.body;
  let authenticationLocals: AuthenticationResponseLocals = res.locals.authentication;
  let user = authenticationLocals.candidateUser as User;

  if (await user.validatePassword(loginRequest.password)) {
    res.locals.user = user;
    next();
  } else {
    next(new ExpressError('Invalid password', 401));
  }
}

export async function sendJwt (req: Request, res: Response, next: NextFunction) {
  let authenticationLocals: AuthenticationResponseLocals = res.locals.authentication;
  let user = authenticationLocals.candidateUser as User;

  let { uuid, firstName, lastName, username } = user;

  let token = jwt.sign({
    uuid,
    firstName,
    lastName,
    username
  },
    jwtSecret,
    {
      issuer: jwtIssuer
    });

  res.json({
    token
  });
}
