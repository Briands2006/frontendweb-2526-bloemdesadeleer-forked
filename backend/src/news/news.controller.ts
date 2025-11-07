import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsListResponseDto, NewsResponseDto } from './news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<NewsListResponseDto> {
    return this.newsService.getAll();
  }

  @Get(':id')
  async getNewsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsResponseDto> {
    return this.newsService.getById(id);
  }
}
