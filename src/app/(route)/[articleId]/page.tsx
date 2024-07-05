"use client";
import Image from "next/image";
import * as S from "../../_styles/ArticleDetail.styles";
import { useRecoilValue } from "recoil";
import { sidebarState } from "@/app/_store/sidebarState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IArticleWithCategory,
  IContentsHeaderList,
} from "@/app/types/Article.types";
import dayjs from "dayjs";
import { IParams } from "@/app/types/params.types";
import NoImage from "../../../../public/icon_noImage.png";
import { exportContentsHeader } from "@/app/_utils/exportContentsHeader";
import useApiLoadingControl from "@/app/_utils/useApiLoadingControl";
import Loading from "@/app/_components/Loading";
import DOMPurify from "isomorphic-dompurify";
import "highlight.js/styles/panda-syntax-dark.css";
import { getCookie } from "@/app/_utils/cookie";
import { api } from "@/app/_client/api";

export default function ArticleDetail({ params }: IParams) {
  const [articleDetail, setArticleDetail] = useState<IArticleWithCategory>();
  const [contentsHeaderList, setContentsHeaderList] =
    useState<IContentsHeaderList[]>();

  const login = getCookie("login");
  const isSidebarOpen = useRecoilValue(sidebarState);

  const router = useRouter();

  const { isLoading, callApi } = useApiLoadingControl<IArticleWithCategory>();

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await callApi(api.getArticle, params.articleId);
      setArticleDetail(article);
    };
    fetchArticle();
  }, [callApi, params]);

  useEffect(() => {
    setContentsHeaderList(exportContentsHeader(articleDetail?.contents));
  }, [articleDetail]);

  const handleMoveToList = () => {
    router.push("/");
  };

  const handleMoveToEdit = () => {
    router.push(`${params.articleId}/edit`);
  };

  const handleDeleteArticle = () => {
    const deleteArticle = api.deleteArticle(params.articleId);

    deleteArticle.then((data) =>
      data.status === 200 ? router.push("/") : alert("삭제 실패")
    );
  };

  return (
    <S.Container>
      {isLoading && <Loading />}
      <S.ArticleContainer $isSidebarOpen={isSidebarOpen}>
        <S.ArticleInfoContainer>
          <S.ArticleTitle>{articleDetail?.title}</S.ArticleTitle>
          <S.ArticleCategory>
            [ {articleDetail?.Category.name} ]
          </S.ArticleCategory>
          <S.DateEditContainer>
            <S.Date>{dayjs(articleDetail?.date).format("YYYY.MM.DD")}</S.Date>
            <S.EditDeleteContainer>
              <S.TextButton onClick={handleMoveToList}>목록으로</S.TextButton>
              {login && (
                <>
                  <S.TextButton onClick={handleMoveToEdit}>수정</S.TextButton>
                  <S.TextButton onClick={handleDeleteArticle}>
                    삭제
                  </S.TextButton>
                </>
              )}
            </S.EditDeleteContainer>
          </S.DateEditContainer>
        </S.ArticleInfoContainer>
      </S.ArticleContainer>
      <S.ContentsContainer>
        <S.ThumbnailContentsContainer $isSidebarOpen={isSidebarOpen}>
          {articleDetail?.thumbnailUrl && (
            <S.Thumbnail>
              <Image
                src={
                  articleDetail?.thumbnailUrl
                    ? articleDetail.thumbnailUrl
                    : NoImage
                }
                alt="썸네일"
                width={100}
                height={100}
              />
            </S.Thumbnail>
          )}
          <S.Contents
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(articleDetail?.contents || ""),
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
