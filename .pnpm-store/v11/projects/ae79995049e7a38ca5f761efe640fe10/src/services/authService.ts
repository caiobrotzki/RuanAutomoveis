import type { ApiResponse } from '../types/api';
import type { AuthData, JwtPayload, LoginCredentials } from '../types/auth';
import { apiRequest } from './api';

const AUTH_STORAGE_KEY = 'ruan-automoveis-auth';

async function login(credentials: LoginCredentials): Promise<AuthData> {
  const response = await apiRequest<ApiResponse<AuthData>>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return response.data;
}

function readTokenPayload(token: string): JwtPayload | null {
  try {
    const encodedPayload = token.split('.')[1];
    if (!encodedPayload) return null;

    const normalized = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded)) as JwtPayload;
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const payload = readTokenPayload(token);
  return typeof payload?.exp === 'number' && payload.exp * 1000 > Date.now();
}

function saveAuth(auth: AuthData): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

function getStoredAuth(): AuthData | null {
  try {
    const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedValue) return null;

    const auth = JSON.parse(storedValue) as AuthData;
    if (!auth.token || !auth.admin || !isTokenValid(auth.token)) {
      clearAuth();
      return null;
    }

    return auth;
  } catch {
    clearAuth();
    return null;
  }
}

function clearAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export const authService = {
  login,
  saveAuth,
  getStoredAuth,
  clearAuth,
  isTokenValid,
};
