import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { UserController } from './user.controller';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
