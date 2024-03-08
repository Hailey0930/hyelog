"use client";
import Image from "next/image";
import * as S from "../../_styles/BlogDetail.styles";
import { useRecoilValue } from "recoil";
import { sidebarState } from "@/app/_store/sidebarState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlog } from "@/app/types/Blog.types";
import dayjs from "dayjs";
import DetailViewer from "@/app/_components/DetailViewer";
import { blogDetailAPI } from "@/app/_client/api";
import { IParams } from "@/app/types/params.types";

export default function BlogDetail({ params }: IParams) {
  const indexArr = ["#1", "##2", "###3", "####4", "#5"];

  const [blogDetail, setBlogDetail] = useState<IBlog>();

  const isSidebarOpen = useRecoilValue(sidebarState);

  const router = useRouter();

  useEffect(() => {
    blogDetailAPI(params.blogId).then((data) => setBlogDetail(data));
  }, [params]);

  const handleMoveToList = () => {
    router.push("/");
  };

  const handleMoveToEdit = () => {
    router.push(`${params.blogId}/edit`);
  };

  return (
    <S.Container>
      <S.BlogContainer $isSidebarOpen={isSidebarOpen}>
        <S.BlogInfoContainer>
          <S.BlogTitle>{blogDetail?.title}</S.BlogTitle>
          <S.DateEditContainer>
            <S.Date>{dayjs(blogDetail?.date).format("YYYY.MM.DD")}</S.Date>
            <S.EditDeleteContainer>
              <S.TextButton onClick={handleMoveToList}>목록으로</S.TextButton>
              <S.TextButton onClick={handleMoveToEdit}>수정</S.TextButton>
              <S.TextButton>삭제</S.TextButton>
            </S.EditDeleteContainer>
          </S.DateEditContainer>
        </S.BlogInfoContainer>
      </S.BlogContainer>
      <S.ContentsContainer>
        <S.ThumbnailContentsContainer $isSidebarOpen={isSidebarOpen}>
          <S.Thumbnail>
            <Image src={blogDetail ? blogDetail.thumbnail : ""} alt="썸네일" />
          </S.Thumbnail>
          <S.Contents>
            <DetailViewer contents="" />
          </S.Contents>
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
