import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';

export const login = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);
  // 👇 2
  const token = await authService.login({
    email: 'fan@f1site.com',
    password: 'testPassword2',
  });

  if (!token) {
    throw new Error('No token received');
  }

  return token;
};

export const loginAdmin = async (app: INestApplication): Promise<string> => {
  const authService = app.get(AuthService);
  const token = await authService.login({
    email: 'admin@f1site.com',
    password: 'testPassword',
  });

  if (!token) {
    throw new Error('No token received');
  }

  return token;
};
