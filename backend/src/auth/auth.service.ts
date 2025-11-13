import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ServerConfig } from '../config/config';
import * as argon2 from 'argon2';
import { User } from '../types/user';
import { JwtPayload } from '../types/auth';
import { LoginRequestDto } from '../session/session.dto';
import { eq } from 'drizzle-orm';
import { users } from '../drizzle/schema';
import { RegisterUserRequestDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ServerConfig>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const authConfig = this.configService.get<AuthConfig>('auth')!;
    return argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: authConfig.hashLength,
      timeCost: authConfig.timeCost,
      memoryCost: authConfig.memoryCost,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  private signJwt(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      admin: user.isAdmin,
    });
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid auth token');
    }

    return payload;
  }

  async login({ email, password }: LoginRequestDto): Promise<string> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException(
        'The given email and password do not match a user',
      );
    }

    const validPassword = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        'The given email and password do not match',
      );
    }

    return this.signJwt(user);
  }

  async register({
    name,
    email,
    password,
    birthdate,
  }: RegisterUserRequestDto): Promise<string> {
    const passwordHash = await this.hashPassword(password);

    const [newUser] = await this.db
      .insert(users)
      .values({
        name,
        email,
        passwordHash: passwordHash,
        isAdmin: false,
        birthdate: new Date(birthdate),
      })
      .$returningId();

    const user = await this.db.query.users.findFirst({
      where: eq(users.id, newUser.id),
    });

    return this.signJwt(user!);
  }
}
