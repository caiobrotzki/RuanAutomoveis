export interface AuthTokenPayload {
  sub: string;
  email: string;
}

export interface AuthenticatedAdmin {
  id: string;
  name: string;
  email: string;
}
