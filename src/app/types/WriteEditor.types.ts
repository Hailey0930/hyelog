export type IPreview = "vertical" | "tab";

export interface IWriteProps {
  title?: string;
  contents?: string;
  thumbnail?: string;
}

export interface IWriteCategoryList {
  id: string;
  name: string;
}
