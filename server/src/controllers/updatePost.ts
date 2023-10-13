import { Request, Response } from 'express';
import { DB } from '../db/db';

export async function updatePost(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const row = DB.posts.find(post => post.id === postId);

    if (!row) {
      res.status(404);
      return res.send('Not found');
    }

    delete req.body.id;

    const newRow = {
      ...row,
      ...req.body,
    };

    DB.posts = DB.posts.map(post => (post.id === postId ? newRow : post));

    res.json(newRow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
