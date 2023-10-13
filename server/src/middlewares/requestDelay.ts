import { NextFunction, Request, Response } from 'express';

const sleep = async (ms = 1000) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function requestDelay(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await sleep();
  next();
}
