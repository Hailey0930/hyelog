import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import dynamic from "next/dynamic";
import { IWriteProps } from "../types/WriteEditor.types";

const Editor = dynamic(() => import("./WriteEdit"), { ssr: false });

export default function NoSSRWriteEdit({
  title,
  contents,
  thumbnail,
}: IWriteProps) {
  return <Editor title={title} contents={contents} thumbnail={thumbnail} />;
}
