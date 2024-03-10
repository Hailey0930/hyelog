export interface IBlog {
  id: string;
  title: string;
  contents: string;
  date: Date;
  thumbnail: any;
  category: string;
  categoryId: string;
}

export type IBlogParams = {
  params: { blogId: string };
};
