"use client";
import Image from "next/image";
import * as S from "../../_styles/BlogDetail.styles";
import { useRecoilValue } from "recoil";
import { sidebarState } from "@/app/_store/sidebarState";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlogDetail } from "@/app/types/BlogDetail.types";
import { sleep } from "@/app/_utils/sleep";
import dayjs from "dayjs";

export default function BlogDetail() {
  const indexArr = ["#1", "##2", "###3", "####4", "#5"];

  const [blogDetail, setBlogDetail] = useState<IBlogDetail>();

  const isSidebarOpen = useRecoilValue(sidebarState);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetchBlogDetailAPI().then((data) => setBlogDetail(data));
  }, []);

  const fetchBlogDetailAPI = async () => {
    await sleep();

    return {
      id: "1",
      title: "",
      date: new Date(),
      thumbnail: "",
      contents: "",
    };
  };

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
