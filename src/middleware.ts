import * as log from 'loglevel';
import { NextFunction, Request, Response } from 'express';

export class ExpressError {
  error: Error;
  statusCode: number;

  constructor (error: Error | string, statusCode?: number) {
    if (typeof error === 'string') {
      this.error = new Error(error);
    } else {
      this.error = error;
    }
    this.statusCode = statusCode || 500;
  }

  toJSON () {
    return {
      name: this.error.name,
      message: this.error.message,
      stack: this.error.stack
    };
  }
}

export function handleError (err: ExpressError, req: Request, res: Response, next: NextFunction) {
  log.error(err.error);
  res.status(err.statusCode);
  res.json(err);
}
