import { Request, Response } from 'express';
import crypto from 'node:crypto';
import { DB } from '../db/db';

export async function createPost(req: Request, res: Response) {
  try {
    const randomBytes = crypto.randomBytes(16);
    const id = randomBytes.toString('hex');
    const row = {
      id,
      ...req.body,
    };

    DB.posts.push(row);

    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
