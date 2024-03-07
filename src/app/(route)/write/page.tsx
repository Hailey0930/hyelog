"use client";
import * as S from "../../_styles/Write.styles";
import { useEffect, useState } from "react";
import { breakPoints } from "@/app/_styles/breakPoints";
import dynamic from "next/dynamic";
import { IPreview } from "@/app/types/WriteEditor.types";

export default function Write() {
  const [preview, setPreview] = useState<IPreview>("vertical");

  const WriteEditor = dynamic(() => import("../../_components/WriteEditor"), {
    ssr: false,
  });

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
        <WriteEditor preview={preview} />
      </S.EditorContainer>
      <S.BottomContainer>
        <S.TextButton>돌아가기</S.TextButton>
        <S.TextButton>작성하기</S.TextButton>
      </S.BottomContainer>
    </S.Container>
  );
}
