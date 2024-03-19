import { Injectable } from '@nestjs/common';
import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';
import { News } from 'src/modules/main/entities/news.entity';

@Injectable()
export class NewsDataMapper {
  newsToSearchResult(entity: News): NewsToListItem {
    const { id, title, description, publishedAt } = entity;
    return {
      id: id,
      title: title,
      description: description,
      publishedAt: publishedAt
    };
  }

  newsGetById(entity: News): NewsToItemById {
    const { id, title, description, publishedAt } = entity;

    return {
      id: id,
      title: title,
      description: description,
      publishedAt: publishedAt
    };
  }
}
