import { Category } from 'src/modules/main/interfaces/category';

export interface NewsToListItem {
  id: string;
  title: string;
  description: string;
  language: string;
  publishedAt: string;
  categories: Category[];
}

export interface NewsToItemById {
  id: string;
  title: string;
  description: string;
  language: string;
  publishedAt: string;
  categories: Category[];
}
