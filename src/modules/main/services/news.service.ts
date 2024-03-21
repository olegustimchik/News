import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Like, Not, Raw } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news';
import { NewsListRequestDto } from 'src/modules/main/dto/request/newsList.dto';
import { NewsEntity } from 'src/modules/main/entities/news.entity';
import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryTranslationEntity } from '../entities/categoryTranslation.entity';
import { NewsToCategoryEntity } from '../entities/newsToCategory.entity';

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>, 
    @InjectRepository(NewsToCategoryEntity) private newsToCategoryEntity: Repository<NewsToCategoryEntity>,
  ) { }

  async getList(query: NewsListRequestDto, language = 'English'): Promise<{ data: NewsToListItem[] }> {
    let publishedAtRaw = ``;
    if (query.publishedAfter && query.publishedBefore) {
      publishedAtRaw += `"publishedAt" IS NOT NULL AND "publishedAt" >= '${query.publishedAfter}' OR "publishedAt" <= '${query.publishedBefore}'`;
    } else if (query.publishedBefore) {
      publishedAtRaw += `"publishedAt" IS NOT NULL  AND "publishedAt" <= '${query.publishedBefore}'`;
    } else if (query.publishedAfter) {
      publishedAtRaw += `"publishedAt" IS NOT NULL AND "publishedAt" >= '${query.publishedAfter}'`;
    } else {
      publishedAtRaw += `"publishedAt" IS NOT NULL `;
    }

    const newsList = await this.newsRepository.find({
      relations: { newsToCategories: true, newsTranslations: true },
      where: {
        isPublished: true,
        publishedAt: Raw(publishedAtRaw),
          newsToCategories: { 
            category: {
              categoryTranslations: {

              }
            }
          },
        //   newsTranslations: [
        //     {
        //       language: language,
        //       title: query?.searchTerm ? Like(`%${query.searchTerm}%`) : undefined,
        //     },
        //     {
        //       language: language,
        //       description: query?.searchTerm ? Like(`%${query.searchTerm}%`) : undefined,
        //     },
        //   ],
      },
      relationLoadStrategy: "join",
    });
    console.log(newsList);
     const sql = await this.newsRepository.createQueryBuilder("news")
     .leftJoinAndSelect("news.newsToCategories", "newsToCategory") // Assuming newsToCategories is the relation name in News entity
     .leftJoinAndSelect("newsToCategory.category", "category") // Assuming category is the relation name in NewsToCategory entity
     .leftJoinAndSelect("category.categoryTranslations", "categoryTranslation") // Assuming categoryTranslations is the relation name in Category entity
     .where("categoryTranslation.language IS NOT NULL").getSql();// Filtering by non-null language
    console.log(sql);
     //  .getMany() // or getOne(), depending on your needs

    //  .then(news => {
    //      console.log(news);
    //  });
    // return { data: newsList.map((news) => this.newsDataMapper.newsToSearchResult(news)) };
    return { data: null }
  }

  async withCategories() {
    const news = await this.newsRepository.createQueryBuilder("news").innerJoin(CategoryEntity, "category").innerJoin(CategoryTranslationEntity, "translation", "translation.categoryId = category.id").printSql().getMany();

    return news;
  }
  async getItemById(id: string): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: { id: id, isPublished: true },
    });

    if (foundItem) {
      return { data: this.newsDataMapper.newsGetById(foundItem) };
    } else {
      throw new NotFoundException();
    }
  }
}
