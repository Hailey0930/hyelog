import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import { IPreview } from "../types/WriteEditor.types";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";
import { breakPoints } from "../_styles/breakPoints";

const WriteEditor = () => {
  const Editor = dynamic(
    () => import("@toast-ui/react-editor").then((m) => m.Editor),
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

  const [preview, setPreview] = useState<IPreview>("vertical");

  useEffect(() => {
    const handleResize = () => {
      setPreview(window.innerWidth > breakPoints.medium ? "vertical" : "tab");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Editor
      previewStyle={preview}
      initialValue=""
      height="100%"
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[
        [dynamicCodeSyntax],
        [dynamicCodeSyntaxHighlight, { highlighter: Prism }],
      ]}
    />
  );
};

export default memo(WriteEditor);
