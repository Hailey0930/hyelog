export interface IBlog {
  id: string;
  title: string;
  contents: string;
  date: Date;
  thumbnail: any;
  categoryId: string;
}

export type IBlogParams = {
  params: { blogId: string };
};

export type IContentsHeaderList = {
  id: string;
  tag: string;
  content: string;
};
