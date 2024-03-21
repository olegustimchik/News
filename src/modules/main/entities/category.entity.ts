import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { CategoryTranslationEntity } from 'src/modules/main/entities/categoryTranslation.entity';
import { NewsToCategoryEntity } from 'src/modules/main/entities/newsToCategory.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany((type) => CategoryTranslationEntity, (categoryTranslation) => categoryTranslation.category)
  categoryTranslations: Relation<CategoryTranslationEntity[]>;

  @OneToMany((type) => NewsToCategoryEntity, (newsToCategoryEntity) => newsToCategoryEntity.category)
  newsToCategories: Relation<NewsToCategoryEntity[]>;
}
