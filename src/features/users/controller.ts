import { Request, Response, NextFunction } from 'express';
import { UserModel } from './model';

export async function addUser (req: Request, res: Response, next: NextFunction) {
  let { firstName, lastName, username, hNumber, password, role, isRegister } = req.body;
  if (isRegister) {
    role = null;
  }

  try {
    let user = await UserModel.create({
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

export function readUsers (req: Request, res: Response, next: NextFunction) {
  try {
    let users = UserModel.findAll();
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
