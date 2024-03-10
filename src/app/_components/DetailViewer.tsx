import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import dynamic from "next/dynamic";

interface IEditorViewer {
  contents: string;
}

export default function DetailViewer({ contents }: IEditorViewer) {
  const Viewer = dynamic(
    () => import("@toast-ui/react-editor").then((m) => m.Viewer),
    { ssr: false }
  );

  const dynamicCodeSyntax = dynamic(
    () => import("@toast-ui/editor-plugin-color-syntax"),
    { ssr: false }
  );
  const dynamicCodeSyntaxHighlight = dynamic(
    () => import("@toast-ui/editor-plugin-code-syntax-highlight"),
    { ssr: false }
  );

  return (
    <Viewer
      initialValue={contents}
      plugins={[
        [dynamicCodeSyntax],
        [dynamicCodeSyntaxHighlight, { highlighter: Prism }],
      ]}
    />
  );
}
