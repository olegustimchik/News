import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/modules/main/interfaces/category';

import { CategoryEntity } from 'src/modules/main/entities/category.entity';

import { CategoryTranslationService } from 'src/modules/main/services/categoryTranslation.service';

import { CategoryDataMapper } from 'src/modules/main/data-mappers/category.data-mapper';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryDataMapper: CategoryDataMapper,
    private categoryTranslationService: CategoryTranslationService,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getList(): Promise<{ data: Category[] }> {
    const newsList = await this.categoryRepository.find();

    return { data: newsList.map((news) => this.categoryDataMapper.categoryToSearchResult(news)) };
  }

  async getById(id: string): Promise<{ data: Category }> {
    const foundItem = await this.categoryRepository.findOne({
      where: { id: id },
    });

    if (foundItem) {
      return { data: this.categoryDataMapper.categoryToSearchResult(foundItem) };
    } else {
      throw new NotFoundException();
    }
  }
}
