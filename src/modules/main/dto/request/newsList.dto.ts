import { Expose } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

import { GenericDto } from 'src/core/abstracts/generic.dto';

export class NewsListRequestDto extends GenericDto {
  @IsDateString()
  @Expose()
  @IsOptional()
  publishedBefore?: string;

  @IsDateString()
  @Expose()
  @IsOptional()
  publishedAfter?: string;

  @Expose()
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @Expose()
  @IsString()
  @IsOptional()
  newsCategory?: string;
}
