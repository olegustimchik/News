import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';

import { NewsService } from 'src/modules/main/services/news.service';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly projectService: NewsService) { }

  @Get('list')
  async getList(): Promise<{ data: NewsToListItem[] }> {
    return await this.projectService.getList();
  }

  @Get('byId/:id')
  async getItem(@Param('id') id: string): Promise<{ data: NewsToItemById } | void> {
    if (id && !isUUID(id)) {
      throw new NotFoundException();
    }
    return await this.projectService.getItemById(id);
  }


}
