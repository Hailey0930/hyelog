import { IBlogList } from "./Blog.types";

export interface ICategoryList {
  id: string;
  category: string;
  blogs: IBlogList[];
}

export interface IOpenCategories {
  [id: string]: boolean;
}
