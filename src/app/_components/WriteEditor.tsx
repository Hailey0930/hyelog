import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import CodeSyntax from "@toast-ui/editor-plugin-color-syntax";
import CodeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { IWriteEditorProps } from "../types/WriteEditor.types";

export default function WriteEditor({ preview }: IWriteEditorProps) {
  return (
    <Editor
      previewStyle={preview}
      initialValue=""
      height="100%"
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[[CodeSyntax], [CodeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
