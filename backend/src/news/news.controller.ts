import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsListResponseDto, NewsResponseDto } from './news.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import { CheckUserAccessGuard } from '../auth/guards/userAccess.guard';
import { UseGuards } from '@nestjs/common';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @Public()
  async getAllNews(): Promise<NewsListResponseDto> {
    return this.newsService.getAll();
  }

  @Get(':id')
  @Public()
  async getNewsById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsResponseDto> {
    return this.newsService.getById(id);
  }

  @Get('n/:slug')
  @Public()
  async getNewsBySlug(@Param('slug') slug: string): Promise<NewsResponseDto> {
    return this.newsService.getBySlug(slug);
  }

  @Post()
  @UseGuards(CheckUserAccessGuard)
  async create(@Body() dto: CreateNewsDto) {
    return this.newsService.createNews(dto);
  }

  @Patch(':id')
  @UseGuards(CheckUserAccessGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNewsDto,
  ) {
    return this.newsService.updateNews(id, dto);
  }

  @Delete(':id')
  @UseGuards(CheckUserAccessGuard)
  async deleteNews(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.newsService.delete(id);
  }
}
