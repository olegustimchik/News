import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

import { CategoryEntity } from 'src/modules/main/entities/category.entity';
import { NewsEntity } from 'src/modules/main/entities/news.entity';
@Entity('newsToCategory')
export class NewsToCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar"})
    newsId: string;

    @Column({ type: "varchar"})
    categoryId: string;

    @ManyToOne(() => CategoryEntity, (category) => category.newsToCategories)
    category: CategoryEntity;

    @ManyToOne(() => NewsEntity, (news) => news.newsToCategories)
    news: NewsEntity;
} 