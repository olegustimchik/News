import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { CategoryEntity } from './category.entity';

@Entity('categoryTranslation')
export class CategoryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne((type) => CategoryEntity, (category) => category.categoryTranslations)
  category: Relation<CategoryEntity>;
}
