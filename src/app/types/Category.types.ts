import { IBlog } from "./Blog.types";

export interface ICategoryList {
  id: string;
  category: string;
  blogs: IBlog[];
}

export interface IOpenCategories {
  [id: string]: boolean;
}
