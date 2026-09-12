export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthData {
  token: string;
  admin: AdminUser;
}

export interface JwtPayload {
  exp?: number;
  sub?: string;
  email?: string;
}
