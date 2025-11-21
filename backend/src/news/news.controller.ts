import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsListResponseDto, NewsResponseDto } from './news.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @Public()
  async getAllNews(): Promise<NewsListResponseDto> {
    return this.newsService.getAll();
  }

  @Get(':id')
  async getNewsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsResponseDto> {
    return this.newsService.getById(id);
  }

  @Get('n/:slug')
  async getNewsBySlug(@Param('slug') slug: string): Promise<NewsResponseDto> {
    return this.newsService.getBySlug(slug);
  }
}
