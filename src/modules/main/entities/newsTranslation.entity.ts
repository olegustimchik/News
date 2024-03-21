import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { NewsEntity } from './news.entity';

@Entity('newsTranslation')
export class NewsTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  language: string;

  @ManyToOne((type) => NewsEntity, (news) => news.newsTranslations)
  news: Relation<NewsEntity>;
}
