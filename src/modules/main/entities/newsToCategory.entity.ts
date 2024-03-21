import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
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

    @ManyToOne((type) => CategoryEntity, (category) => category.newsToCategories)
    @JoinColumn({name: "categoryId"})
    category: Relation<CategoryEntity>;

    @ManyToOne((type) => NewsEntity, (news) => news.newsToCategories)
    @JoinColumn({name: "newsId"})
    news: Relation<NewsEntity>;
} 