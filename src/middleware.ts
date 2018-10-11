import * as log from 'loglevel';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'tslint/lib/error';

export class ExpressError {
  error: Error;
  status?: number;

  constructor (error: Error | string, status: number) {
    if (error instanceof Error) {
      this.error = error;
    } else {
      this.error = new Error(error);
    }
    this.status = status;
  }
}

// TODO have a flag for production that will show user-friendly errors instead of stack trace
export function handleError (err: ExpressError, req: Request, res: Response, next: NextFunction) {
  log.error(err);
  res.status(err.status || 500);
  res.json({
    'error': err.error
  });
}
