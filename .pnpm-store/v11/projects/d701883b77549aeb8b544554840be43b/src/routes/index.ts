import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminRouter } from './adminRoutes.js';
import { authRouter } from './authRoutes.js';
import { vehicleRouter } from './vehicleRoutes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

apiRouter.use('/vehicles', vehicleRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/admin', authMiddleware, adminRouter);
