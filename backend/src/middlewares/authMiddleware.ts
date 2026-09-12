import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AdminModel } from '../models/Admin.js';
import type { AuthTokenPayload } from '../types/auth.js';
import { ApiError } from '../utils/ApiError.js';

export const authMiddleware: RequestHandler = async (request, _response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Token de autenticação não informado.');
  }

  const token = authorization.slice(7).trim();

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    if (typeof decoded === 'string' || !decoded.sub || typeof decoded.email !== 'string') {
      throw new ApiError(401, 'Token de autenticação inválido.');
    }

    const payload = decoded as AuthTokenPayload;
    const admin = await AdminModel.findById(payload.sub).select('name email').lean().exec();

    if (!admin) {
      throw new ApiError(401, 'Administrador não encontrado.');
    }

    request.admin = {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, 'Token de autenticação inválido ou expirado.');
  }
};
