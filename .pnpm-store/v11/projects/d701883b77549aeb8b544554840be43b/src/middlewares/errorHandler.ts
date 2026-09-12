import type { ErrorRequestHandler } from 'express';
import multer from 'multer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  void _next;

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE' ? 'Cada imagem deve ter no máximo 5 MB.' : 'Não foi possível processar as imagens enviadas.';
    response.status(400).json({ message });
    return;
  }

  if (error instanceof ApiError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  console.error(error);

  response.status(500).json({
    message: 'Erro interno do servidor.',
    ...(env.nodeEnv === 'development' && error instanceof Error ? { detail: error.message } : {}),
  });
};
