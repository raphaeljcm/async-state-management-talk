import { Request, Response } from 'express';
import { DB } from '../db/db';

export async function listPosts(req: Request, res: Response) {
  try {
    const { pageSize, pageOffset } = req.query;

    const posts = DB.posts.map(data => ({
      ...data,
      content: undefined,
    }));

    if (Number(pageSize)) {
      const start = Number(pageSize) * Number(pageOffset);
      const end = start + Number(pageSize);
      const page = posts.slice(start, end);

      return res.json(page);
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
