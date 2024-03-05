"use client";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import * as S from "../../_styles/Write.styles";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useState } from "react";
import { breakPoints } from "@/app/_styles/breakPoints";

export default function Write() {
  const [preview, setPreview] = useState(
    window.innerWidth > breakPoints.medium ? "vertical" : "tab"
  );

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
    <S.Container>
      <S.Title placeholder="제목을 입력하세요" />
      <S.EditorContainer>
        <Editor
          initialValue=""
          previewStyle={preview}
          height="100%"
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[
            [colorSyntax],
            [codeSyntaxHighlight, { highlighter: Prism }],
          ]}
        />
      </S.EditorContainer>
      <S.BottomContainer>
        <S.TextButton>돌아가기</S.TextButton>
        <S.TextButton>작성하기</S.TextButton>
      </S.BottomContainer>
    </S.Container>
  );
}
