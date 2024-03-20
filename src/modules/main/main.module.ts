import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryDataMapper } from './data-mappers/category.data-mapper';
import { CategoryTranslationDataMapper } from './data-mappers/categoryTranslation.data-mapper';
import { NewsTranslationDataMapper } from './data-mappers/newsTranslation.data-maper';
import { CategoryEntity } from './entities/category.entity';
import { CategoryTranslationEntity } from './entities/categoryTranslation.entity';
import { NewsTranslationEntity } from './entities/newsTranslation.entity';
import { CategoryService } from './services/category.service';
import { CategoryTranslationService } from './services/categoryTranslation.service';
import { NewsTranslationService } from './services/newsTranslation.service';

import { NewsEntity } from 'src/modules/main/entities/news.entity';

import { AppController } from 'src/modules/main/controllers/app.controller';
import { NewsController } from 'src/modules/main/controllers/news.controller';

import { NewsService } from 'src/modules/main/services/news.service';

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsEntity, CategoryEntity, CategoryTranslationEntity, NewsTranslationEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, NewsController],
  providers: [
    CategoryService,
    CategoryDataMapper,
    CategoryTranslationDataMapper,
    NewsService,
    NewsDataMapper,
    NewsTranslationDataMapper,
    CategoryTranslationService,
    NewsTranslationService,
  ],
})
export class MainModule {}
