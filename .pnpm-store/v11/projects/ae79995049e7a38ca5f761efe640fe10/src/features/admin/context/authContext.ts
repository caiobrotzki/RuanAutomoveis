import { createContext } from 'react';
import type { AdminUser, LoginCredentials } from '../../../types/auth';

export interface AuthContextValue {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
