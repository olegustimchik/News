import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
import { NewsTranslationEntity } from './newsTranslation.entity';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'timestamp', nullable: true, default: null })
  publishedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => NewsTranslationEntity, (newsTranslation) => newsTranslation.news)
  newsTranslations: Relation<NewsTranslationEntity[]>;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  categories: CategoryEntity[];
}
