import { Request, Response, Router } from 'express';
import { listPosts } from './controllers/listPosts';
import { failureRateMiddleware } from './middlewares/failureRate';
import { createPost } from './controllers/createPost';
import { listPost } from './controllers/listPost';
import { updatePost } from './controllers/updatePost';
import { deletePost } from './controllers/deletePost';

export const router = Router();

router.get('/', (req: Request, res: Response) => res.send("I'm alive!"));

router.get('/posts', listPosts);
router.get('/posts/:postId', listPost);
router.post('/posts', failureRateMiddleware, createPost);
router.patch('/posts/:postId', failureRateMiddleware, updatePost);
router.delete('/posts/:postId', failureRateMiddleware, deletePost);
