export interface IBlogList {
  id: string;
  title: string;
  contents: string;
  date: Date;
  thumbnail: any;
  category: string;
  categoryId: string | null;
}
