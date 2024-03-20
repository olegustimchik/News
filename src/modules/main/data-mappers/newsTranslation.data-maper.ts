import { Injectable } from '@nestjs/common';

import { NewsTranslationToListItem } from 'src/modules/main/interfaces/newsTranslations';

import { NewsTranslationEntity } from 'src/modules/main/entities/newsTranslation.entity';

@Injectable()
export class NewsTranslationDataMapper {
  newsTranslationToSearchResult(entity: NewsTranslationEntity): NewsTranslationToListItem {
    const { id, description, title, language } = entity;

    return {
      id: id,
      description: description,
      title: title,
      language: language,
    };
  }
}
