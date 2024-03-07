export interface ICategoryList {
  id: string;
  category: string;
  blog: {
    id: number;
    title: string;
    date: Date;
  }[];
}

export interface IOpenCategories {
  [id: string]: boolean;
}
