"use client";
import Image from "next/image";
import * as S from "../../_styles/BlogDetail.styles";
import { useRecoilValue } from "recoil";
import { sidebarState } from "@/app/_store/sidebarState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlog, IContentsHeaderList } from "@/app/types/Blog.types";
import dayjs from "dayjs";
import { blogDeleteAPI, blogDetailAPI } from "@/app/_client/api";
import { IParams } from "@/app/types/params.types";
import NoImage from "../../../../public/icon_noImage.png";
import { exportContentsHeader } from "@/app/_utils/exportContentsHeader";
import useApiLoadingControl from "@/app/_utils/useApiLoadingControl";
import Loading from "@/app/_components/Loading";
import DOMPurify from "isomorphic-dompurify";
import "highlight.js/styles/panda-syntax-dark.css";
import { loginState } from "@/app/_store/loginState";

export default function BlogDetail({ params }: IParams) {
  const [blogDetail, setBlogDetail] = useState<IBlog>();
  const [contentsHeaderList, setContentsHeaderList] =
    useState<IContentsHeaderList[]>();

  const login = useRecoilValue(loginState);
  const isSidebarOpen = useRecoilValue(sidebarState);

  const router = useRouter();

  const { isLoading, callApi } = useApiLoadingControl<IBlog>();

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await callApi(blogDetailAPI, params.blogId);
      setBlogDetail(blog);
    };
    fetchBlog();
  }, [callApi, params]);

  useEffect(() => {
    setContentsHeaderList(exportContentsHeader(blogDetail?.contents));
  }, [blogDetail]);

  const handleMoveToList = () => {
    router.push("/");
  };

  const handleMoveToEdit = () => {
    router.push(`${params.blogId}/edit`);
  };

  const handleDeleteBlog = () => {
    const deleteBlog = blogDeleteAPI(params.blogId);

    deleteBlog.then((data) =>
      data.status === 200 ? router.push("/") : alert("삭제 실패")
    );
  };

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.BlogContainer $isSidebarOpen={isSidebarOpen}>
        <S.BlogInfoContainer>
          <S.BlogTitle>{blogDetail?.title}</S.BlogTitle>
          <S.DateEditContainer>
            <S.Date>{dayjs(blogDetail?.date).format("YYYY.MM.DD")}</S.Date>
            <S.EditDeleteContainer>
              <S.TextButton onClick={handleMoveToList}>목록으로</S.TextButton>
              {login && (
                <>
                  <S.TextButton onClick={handleMoveToEdit}>수정</S.TextButton>
                  <S.TextButton onClick={handleDeleteBlog}>삭제</S.TextButton>
                </>
              )}
            </S.EditDeleteContainer>
          </S.DateEditContainer>
        </S.BlogInfoContainer>
      </S.BlogContainer>
      <S.ContentsContainer>
        <S.ThumbnailContentsContainer $isSidebarOpen={isSidebarOpen}>
          {blogDetail?.thumbnailUrl && (
            <S.Thumbnail>
              <Image
                src={
                  blogDetail?.thumbnailUrl ? blogDetail.thumbnailUrl : NoImage
                }
                alt="썸네일"
                width={100}
                height={100}
              />
            </S.Thumbnail>
          )}
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogDetail?.contents || ""),
            }}
          />
        </S.ThumbnailContentsContainer>
        {contentsHeaderList && (
          <S.ContentsHeaderContainer $isSidebarOpen={isSidebarOpen}>
            <S.HeaderContainer>
              {contentsHeaderList.map((header) => (
                <S.ContentsHeader key={header.id} $level={parseInt(header.tag)}>
                  {header.content}
                </S.ContentsHeader>
              ))}
            </S.HeaderContainer>
          </S.ContentsHeaderContainer>
        )}
      </S.ContentsContainer>
    </S.Container>
  );
}
