import * as log from 'loglevel';
import { NextFunction, Request, Response } from 'express';

// TODO have a flag for production that will show user-friendly errors instead of stack trace
export function handleError (err: any, req: Request, res: Response, next: NextFunction) {
  log.error(err);
  res.status(err.status || 500);
  res.json({
    'error': err.error
  });
}
