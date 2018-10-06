import { Request, Response, NextFunction } from 'express';
import { config } from '../../dependencies';
import { User, UserRole } from './model';

export async function createUser (req: Request, res: Response, next: NextFunction) {
  let { firstName, lastName, username, hNumber, password, role, isRegister } = req.body;
  if (isRegister) {
    if (config.registrationEnabled) {
      role = UserRole.STUDENT;
    } else {
      next({
        statusCode: 403,
        error: 'Registration is disabled'
      });
      return;
    }
  }

  try {
    let user = await User.create({
      firstName,
      lastName,
      username,
      hNumber,
      password,
      role
    });
    res.send(user);
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
  }

}

export function readUser (req: Request, res: Response, next: NextFunction) {
  let { user } = res.locals;
  res.send(user);
}

export async function readUsers (req: Request, res: Response, next: NextFunction) {
  try {
    let users = await User.findAll();
    res.send(users);
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
  }
}

// TODO authorize changing role
export async function updateUser (req: Request, res: Response, next: NextFunction) {
  let { user } = res.locals;
  let { firstName, lastName, username, hNumber, password, role } = req.body;
  try {
    user = await user.update({
      firstName,
      lastName,
      username,
      hNumber,
      password,
      role
    });
    res.send(user);
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
  }
}

export async function deleteUser (req: Request, res: Response, next: NextFunction) {
  let { user } = res.locals;
  try {
    user = await user.destroy();
    res.send(user);
  } catch (err) {
    next({
      statusCode: 500,
      error: err
    });
  }
}
