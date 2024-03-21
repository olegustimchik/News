import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { NewsTranslationEntity } from 'src/modules/main/entities/newsTranslation.entity';
import { NewsToCategoryEntity } from 'src/modules/main/entities/newsToCategory.entity';

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

  @OneToMany((type) => NewsTranslationEntity, (newsTranslation) => newsTranslation.news)
  newsTranslations: Relation<NewsTranslationEntity[]>;

  @OneToMany((type) => NewsToCategoryEntity, (newsToCategoryEntity) => newsToCategoryEntity.news)
  newsToCategories: Relation<NewsToCategoryEntity[]>;
}
