import { Injectable } from '@nestjs/common';

import { CategoryTranslationDataMapper } from './categoryTranslation.data-mapper';

import { Category } from 'src/modules/main/interfaces/category';

import { CategoryEntity } from 'src/modules/main/entities/category.entity';

@Injectable()
export class CategoryDataMapper {
  constructor(private readonly categoryTranslationDataMapper: CategoryTranslationDataMapper) {}

  categoryToSearchResult(entity: CategoryEntity): Category {
    const { id, categoryTranslations } = entity;

    return {
      id: id,
      categoryTranslations: categoryTranslations.map((trans) =>
        this.categoryTranslationDataMapper.categoryToSearchResult(trans),
      ),
    };
  }
}
