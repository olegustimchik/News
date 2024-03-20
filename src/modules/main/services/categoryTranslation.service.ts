import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryTranslationEntity } from 'src/modules/main/entities/categoryTranslation.entity';

@Injectable()
export class CategoryTranslationService {
  constructor(
    @InjectRepository(CategoryTranslationEntity)
    private categoryTranslationRepository: Repository<CategoryTranslationEntity>,
  ) {}

  async save(inf: { title: string; language: string }): Promise<CategoryTranslationEntity> {
    return await this.categoryTranslationRepository.save(inf);
  }
}
