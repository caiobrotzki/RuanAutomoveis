import type { RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  next(new ApiError(404, `Rota não encontrada: ${request.method} ${request.originalUrl}`));
};
