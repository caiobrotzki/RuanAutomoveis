import type { Request, Response } from 'express';
import { authService } from '../services/authService.js';
import { ApiError } from '../utils/ApiError.js';
import { loginSchema } from '../validators/authValidators.js';

async function login(request: Request, response: Response): Promise<void> {
  const validation = loginSchema.safeParse(request.body);

  if (!validation.success) {
    throw new ApiError(400, validation.error.issues[0]?.message ?? 'Dados de login inválidos.');
  }

  const auth = await authService.login(validation.data);
  response.status(200).json({ data: auth });
}

export const authController = { login };
