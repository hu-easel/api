import { Request, Response, NextFunction } from 'express';
import { config } from '../../dependencies';
import { User, UserRole } from './model';
import { ExpressError } from '../../middleware';

export async function createUser (req: Request, res: Response, next: NextFunction) {
  let { firstName, lastName, username, hNumber, password, role, isRegister } = req.body;
  if (isRegister) {
    if (config.registrationEnabled) {
      role = UserRole.STUDENT;
    } else {
      next(new ExpressError('Registration is disabled', 403));
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
    res.json(user);
  } catch (err) {
    next(new ExpressError(err, 500));
  }

}

export function readUser (req: Request, res: Response, next: NextFunction) {
  let { user } = res.locals;
  res.json(user);
}

export async function readUsers (req: Request, res: Response, next: NextFunction) {
  try {
    let users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

// TODO authorize changing role
export async function updateUser (req: Request, res: Response, next: NextFunction) {
  let user = res.locals.user as User;
  let { firstName, lastName, username, hNumber, password, role }:
    { firstName: string, lastName: string, username: string, hNumber: string, password: string, role: UserRole } = req.body;
  try {
    firstName && (user.firstName = firstName);
    lastName && (user.lastName = lastName);
    username && (user.username = username);
    hNumber && (user.hNumber = hNumber);
    password && (user.password = password);
    role && (user.role = role);
    await user.save();
    res.json(user);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function deleteUser (req: Request, res: Response, next: NextFunction) {
  let user = res.locals.user;
  try {
    await user.destroy();
    res.json(user);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}
