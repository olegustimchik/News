import { Injectable } from '@nestjs/common';

import { CategoryTranslation } from 'src/modules/main/interfaces/categoryTranslation';

import { CategoryTranslationEntity } from 'src/modules/main/entities/categoryTranslation.entity';

@Injectable()
export class CategoryTranslationDataMapper {
  categoryToSearchResult(entity: CategoryTranslationEntity): CategoryTranslation {
    const { id, title } = entity;

    return { id, title };
  }
}
