import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../../../services/authService';
import type { AuthData, LoginCredentials } from '../../../types/auth';
import { AuthContext, type AuthContextValue } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthData | null>(() => authService.getStoredAuth());

  const login = useCallback(async (credentials: LoginCredentials) => {
    const nextAuth = await authService.login(credentials);
    authService.saveAuth(nextAuth);
    setAuth(nextAuth);
  }, []);

  const logout = useCallback(() => {
    authService.clearAuth();
    setAuth(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin: auth?.admin ?? null,
      token: auth?.token ?? null,
      isAuthenticated: Boolean(auth?.token && authService.isTokenValid(auth.token)),
      login,
      logout,
    }),
    [auth, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
