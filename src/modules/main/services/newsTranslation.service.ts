import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsTranslationEntity } from 'src/modules/main/entities/newsTranslation.entity';

@Injectable()
export class NewsTranslationService {
  constructor(
    @InjectRepository(NewsTranslationEntity) private newsTranslationRepository: Repository<NewsTranslationEntity>,
  ) {}

  async save(inf: { title: string; language: string; description: string }): Promise<NewsTranslationEntity> {
    return await this.newsTranslationRepository.save(inf);
  }
}
