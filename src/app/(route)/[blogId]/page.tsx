"use client";
import Image from "next/image";
import * as S from "../../_styles/BlogDetail.styles";
import { useRecoilValue } from "recoil";
import { sidebarState } from "@/app/_store/sidebarState";
import { useRouter } from "next/navigation";

export default function BlogDetail() {
  const blogDetail = {
    id: "1",
    title: "제목",
    date: "2024.03.05",
    thumbnail: "",
    contents: "",
  };
  const indexArr = ["#1", "##2", "###3", "####4", "#5"];

  const isSidebarOpen = useRecoilValue(sidebarState);

  const router = useRouter();

  const handleMoveToList = () => {
    router.push("/");
  };

  return (
    <S.Container>
      <S.BlogContainer $isSidebarOpen={isSidebarOpen}>
        <S.BlogInfoContainer>
          <S.BlogTitle>{blogDetail.title}</S.BlogTitle>
          <S.DateEditContainer>
            <S.Date>{blogDetail.date}</S.Date>
            <S.EditDeleteContainer>
              <S.TextButton onClick={handleMoveToList}>목록으로</S.TextButton>
              <S.TextButton>수정</S.TextButton>
              <S.TextButton>삭제</S.TextButton>
            </S.EditDeleteContainer>
          </S.DateEditContainer>
        </S.BlogInfoContainer>
      </S.BlogContainer>
      <S.ContentsContainer>
        <S.ThumbnailContentsContainer $isSidebarOpen={isSidebarOpen}>
          <S.Thumbnail>
            <Image src={blogDetail.thumbnail} alt="썸네일" />
          </S.Thumbnail>
          <S.Contents></S.Contents>
        </S.ThumbnailContentsContainer>
        <S.IndexContainer $isSidebarOpen={isSidebarOpen}>
          <S.IndexWrapper>
            {indexArr.map((title, index) => {
              const match = title.match(/^#+/);
              const level = match ? match[0].split("").length : 0;

              return (
                <S.Index key={index} $level={level}>
                  {title.substring(level)}
                </S.Index>
              );
            })}
          </S.IndexWrapper>
        </S.IndexContainer>
      </S.ContentsContainer>
    </S.Container>
  );
}
