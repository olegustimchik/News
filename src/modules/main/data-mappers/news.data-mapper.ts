import { Injectable } from '@nestjs/common';

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';

import { NewsEntity } from 'src/modules/main/entities/news.entity';

import { NewsTranslationDataMapper } from 'src/modules/main/data-mappers/newsTranslation.data-maper';

@Injectable()
export class NewsDataMapper {
  constructor(private readonly newsTranslationDataMapper: NewsTranslationDataMapper) {}

  newsToSearchResult(entity: NewsEntity): NewsToListItem {
    const { id, newsTranslations, publishedAt } = entity;
    const news = newsTranslations.map((translation) =>
      this.newsTranslationDataMapper.newsTranslationToSearchResult(translation),
    );
    if (news.length < 1) {
      return null;
    }

    return {
      id: id,
      publishedAt: publishedAt,
      title: news[0].title,
      description: news[0].description,
      language: news[0].language,
      categories: null,
    };
  }

  newsGetById(entity: NewsEntity): NewsToItemById {
    const { id, newsTranslations, publishedAt } = entity;
    const news = newsTranslations.map((translation) =>
      this.newsTranslationDataMapper.newsTranslationToSearchResult(translation),
    );
    if (news.length < 1) {
      return null;
    }

    return {
      id: id,
      publishedAt: publishedAt,
      title: news[0].title,
      description: news[0].description,
      language: news[0].language,
      categories: null,
    };
  }
}
