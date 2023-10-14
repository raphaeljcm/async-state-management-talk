import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from './router';
import { requestDelay } from './middlewares/requestDelay';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestDelay);
app.use(router);

app.listen(3333, () => console.log('Server is running on port 3333'));
