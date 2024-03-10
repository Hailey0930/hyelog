import { IBlog } from "./Blog.types";

export interface ICategoryList {
  id: string;
  name: string;
  blogs: IBlog[];
}

export interface IOpenCategories {
  [id: string]: boolean;
}
