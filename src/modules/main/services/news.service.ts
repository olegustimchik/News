import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';

import { NewsListRequestDto } from 'src/modules/main/dto/request/newsList.dto';

import { NewsEntity } from 'src/modules/main/entities/news.entity';

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
  ) {}

  async getList(query: NewsListRequestDto, language = 'English'): Promise<{ data: NewsToListItem[] }> {
    let publishedAtRaw = ``;
    if (query.publishedAfter && query.publishedBefore) {
      publishedAtRaw += `"publishedAt" IS NOT NULL AND "publishedAt" >= '${query.publishedAfter}' OR "publishedAt" <= '${query.publishedBefore}'`;
    } else if (query.publishedBefore) {
      publishedAtRaw += `"publishedAt" IS NOT NULL  AND "publishedAt" <= '${query.publishedBefore}'`;
    } else if (query.publishedAfter) {
      publishedAtRaw += `"publishedAt" IS NOT NULL AND "publishedAt" >= '${query.publishedAfter}'`;
    } else {
      publishedAtRaw += `"publishedAt" IS NOT NULL `;
    }

    const newsList = await this.newsRepository.find({
      where: {
        isPublished: true,
        categories: {
          categoryTranslations: {
            language: language,
          },
        },
        publishedAt: Raw(publishedAtRaw),
        newsTranslations: [
          {
            language: language,
            title: query?.searchTerm ? Like(`%${query.searchTerm}%`) : undefined,
          },
          {
            language: language,
            description: query?.searchTerm ? Like(`%${query.searchTerm}%`) : undefined,
          },
        ],
      },
      relations: { categories: true, newsTranslations: true },
    });

    // const newsList = await this.newsRepository.createQueryBuilder("news").leftJoinAndSelect("news.categories", "categories");
    return { data: newsList.map((news) => this.newsDataMapper.newsToSearchResult(news)) };
  }

  async getItemById(id: string): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: { id: id, isPublished: true },
    });

    if (foundItem) {
      return { data: this.newsDataMapper.newsGetById(foundItem) };
    } else {
      throw new NotFoundException();
    }
  }
}
