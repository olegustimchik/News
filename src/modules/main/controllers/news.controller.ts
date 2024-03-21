import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';

import { NewsListRequestDto } from 'src/modules/main/dto/request/newsList.dto';

import { NewsService } from 'src/modules/main/services/news.service';
import { NewsEntity } from '../entities/news.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Get('list')
  async getList(@Query() query: NewsListRequestDto): Promise<{ data: NewsToListItem[] }> {
    return await this.newsService.getList(query);
  }

  @Get('listCat')
  async getWithCategory(@Query() query: NewsListRequestDto) {
    return (await this.newsService.withCategories());
  }

  @Get('byId/:id')
  async getItem(@Param('id') id: string): Promise<{ data: NewsToItemById } | void> {
    if (id && !isUUID(id)) {
      throw new NotFoundException();
    }

    return await this.newsService.getItemById(id);
  }
}
