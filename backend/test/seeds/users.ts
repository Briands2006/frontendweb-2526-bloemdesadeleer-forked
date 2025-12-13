import { INestApplication } from '@nestjs/common';
import { AuthService } from '../../src/auth/auth.service';
import { DatabaseProvider } from '../../src/drizzle/drizzle.provider';
import { users } from '../../src/drizzle/schema';

export async function seedUsers(
  app: INestApplication,
  drizzle: DatabaseProvider,
) {
  const authService = app.get(AuthService);
  const passwordHash1 = await authService.hashPassword('testPassword');
  const passwordHash2 = await authService.hashPassword('testPassword2');
  const passwordHash3 = await authService.hashPassword('testPassword3');

  await drizzle.insert(users).values([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@f1site.com',
      passwordHash: passwordHash1,
      birthdate: new Date(1990, 0, 1),
      isAdmin: true,
      dateJoined: new Date(2025, 0, 1),
    },
    {
      id: 2,
      name: 'Regular Fan',
      email: 'fan@f1site.com',
      passwordHash: passwordHash2,
      birthdate: new Date(1995, 5, 15),
      isAdmin: false,
      dateJoined: new Date(2025, 0, 15),
    },
    {
      id: 3,
      name: 'Regular Fan 2.0',
      email: 'fan2@f1site.com',
      passwordHash: passwordHash3,
      birthdate: new Date(1994, 7, 232),
      isAdmin: false,
      dateJoined: new Date(2025, 0, 15),
    },
  ]);
}

export async function clearUsers(drizzle: DatabaseProvider) {
  await drizzle.delete(users);
}
