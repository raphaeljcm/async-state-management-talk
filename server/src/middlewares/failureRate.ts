import { Request, Response, NextFunction } from 'express';

const FAILURE_RATE = 0.5;

export function failureRateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (Math.random() > FAILURE_RATE)
    return res.status(500).json({ message: 'Request failed' });

  next();
}
