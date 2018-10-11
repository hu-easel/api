import * as log from 'loglevel';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'tslint/lib/error';

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
}

// TODO have a flag for production that will show user-friendly errors instead of stack trace
export function handleError (err: ExpressError, req: Request, res: Response, next: NextFunction) {
  log.error(err.error);
  res.status(err.statusCode);
  res.json({
    'error': err.error
  });
}
