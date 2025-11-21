import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { NewsListResponseDto, NewsResponseDto } from './news.dto';
import { eq } from 'drizzle-orm';
import { news } from '../drizzle/schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<NewsListResponseDto> {
    const news = await this.db.query.news.findMany();
    return { news };
  }

  async getById(id: number): Promise<NewsResponseDto> {
    const newsMessage = await this.db.query.news.findFirst({
      where: eq(news.id, id),
    });
    if (!newsMessage) {
      throw new NotFoundException('No news with that id exist');
    }
    return newsMessage;
  }

  async getBySlug(slug: string): Promise<NewsResponseDto> {
    const article = await this.db.query.news.findFirst({
      where: eq(news.slug, slug),
    });
    if (!article) {
      throw new NotFoundException('No news with this slug exists');
    }
    return article;
  }
}
