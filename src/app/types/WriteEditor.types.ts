export type IPreview = "vertical" | "tab";

export interface IWriteEditorProps {
  preview: IPreview;
  initialValue?: string;
}
