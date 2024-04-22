import { IArticle } from "./Article.types";

export interface ICategoryList {
  id: string;
  name: string;
  blogs: IArticle[];
}

export interface IOpenCategories {
  [id: string]: boolean;
}
