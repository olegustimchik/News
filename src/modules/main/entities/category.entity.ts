import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { CategoryTranslationEntity } from './categoryTranslation.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => CategoryTranslationEntity, (categoryTranslation) => categoryTranslation.category)
  categoryTranslations: Relation<CategoryTranslationEntity[]>;
}
