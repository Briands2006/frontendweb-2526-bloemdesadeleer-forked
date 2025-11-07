import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [DrizzleModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
