import { Request, Response } from 'express';
import { DB } from '../db/db';

export async function deletePost(req: Request, res: Response) {
  try {
    const { postId } = req.params;

    const row = DB.posts.find(post => post.id === postId);

    if (!row) {
      res.status(404);
      return res.send('Not found');
    }

    DB.posts = DB.posts.filter(post => post.id !== postId);

    res.status(204);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
