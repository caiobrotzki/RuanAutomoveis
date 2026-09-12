import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AdminModel } from '../models/Admin.js';
import type { AuthTokenPayload } from '../types/auth.js';
import { ApiError } from '../utils/ApiError.js';
import type { LoginInput } from '../validators/authValidators.js';

async function login({ email, password }: LoginInput) {
  const admin = await AdminModel.findOne({ email }).select('+password').exec();

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    throw new ApiError(401, 'E-mail ou senha inválidos.');
  }

  const payload: Omit<AuthTokenPayload, 'sub'> = { email: admin.email };
  const token = jwt.sign(payload, env.jwtSecret, {
    subject: admin.id,
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  });

  return {
    token,
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
  };
}

export const authService = { login };
