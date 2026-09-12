import cors from 'cors';
import express from 'express';
import path from 'node:path';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { apiRouter } from './routes/index.js';

export const app = express();

app.disable('x-powered-by');
app.use(
  cors({
    origin: env.frontendUrl,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
