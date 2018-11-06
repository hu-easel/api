import { Request, Response, NextFunction } from 'express';
import { ExpressError } from '../../../middleware';
import { Content } from './model';
import { ContentResponseLocals } from './types';

interface CreateContentRequest {
  name: string;
}

export async function createContent (req: Request, res: Response, next: NextFunction) {
  let { name } = req.body as CreateContentRequest;
  try {
    let content = Content.create({
      name
    });
    res.json(content);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function readContent (req: Request, res: Response, next: NextFunction) {
  let { contentParam } = res.locals as ContentResponseLocals;
  res.json(contentParam);
}

export async function readContents (req: Request, res: Response, next: NextFunction) {
  try {
    let contents = await Content.findAll();
    res.json(contents);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

interface UpdateContentRequest {
  name?: string;
}

export async function updateContent (req: Request, res: Response, next: NextFunction) {
  // TODO can this line be cleaned up?
  let content = (res.locals as ContentResponseLocals).contentParam as Content;
  let { name } = req.body as UpdateContentRequest;
  if (name) content.name = name;
  try {
    await content.save();
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}

export async function deleteContent (req: Request, res: Response, next: NextFunction) {
  let content = (res.locals as ContentResponseLocals).contentParam as Content;
  try {
    await content.destroy();
    res.json(content);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
}
