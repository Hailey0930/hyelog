export interface IArticle {
  id: string;
  title: string;
  contents: string;
  date: Date;
  thumbnailUrl: string | null;
  thumbnailId: string | null;
  categoryId: string;
}

export interface IArticleWithCategory extends IArticle {
  Category: {
    id: string;
    name: string;
  };
}

export type IArticleParams = {
  params: { articleId: string };
};

export type IContentsHeaderList = {
  id: string;
  tag: string;
  content: string;
};
