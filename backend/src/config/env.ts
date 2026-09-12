import 'dotenv/config';

function parsePort(value: string | undefined): number {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
  }

  return port;
}

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`A variável de ambiente ${name} não foi definida.`);
  }

  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  publicUrl: process.env.BACKEND_PUBLIC_URL?.replace(/\/$/, '') ?? `http://localhost:${parsePort(process.env.PORT)}`,
  mongodbUri: requireEnvironmentVariable('MONGODB_URI'),
  jwtSecret: requireEnvironmentVariable('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN?.trim() || '7d',
};
