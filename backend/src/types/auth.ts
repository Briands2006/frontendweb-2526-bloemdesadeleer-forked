export interface JwtPayload {
  sub: number;
  email: string;
  admin: boolean;
}

export interface Session {
  id: number;
  email: string;
  admin: boolean;
}
