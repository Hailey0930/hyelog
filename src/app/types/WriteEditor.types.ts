export type IPreview = "vertical" | "tab";

export interface IWriteEditorProps {
  preview: IPreview;
  initialValue?: string;
}

export interface IWriteProps {
  title?: string;
  contents?: string;
  thumbnail?: string;
}

export interface IWriteCategoryList {
  id: string;
  category: string;
  value: string;
}
