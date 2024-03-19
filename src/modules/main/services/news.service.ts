import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';

import { News } from 'src/modules/main/entities/news.entity';

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper';

@Injectable()
export class NewsService {
  constructor(private readonly NewsDataMapper: NewsDataMapper, @InjectRepository(News) private newsRepository: Repository<News>,
  ) { }

  async getList(): Promise<{ data: NewsToListItem[] }> {
    const newsList = await this.newsRepository.find({ where: { isPublished: true } });

    return { data: newsList.map((news) => this.NewsDataMapper.newsToSearchResult(news)) };
  }

  async getItemById(id: string): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: { id: id, isPublished: true },
    });

    if (foundItem) {
      return { data: this.NewsDataMapper.newsGetById(foundItem) };
    } else {
      throw new NotFoundException();
    }
  }
}
