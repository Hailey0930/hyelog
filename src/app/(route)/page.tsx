"use client";
import Image from "next/image";
import * as S from "../_styles/Article.styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IArticleWithCategory } from "../types/Article.types";
import dayjs from "dayjs";
import NoImage from "../../../public/icon_noImage.png";
import useApiLoadingControl from "../_utils/useApiLoadingControl";
import Loading from "../_components/Loading";
import { api } from "../_client/api";

export default function Article() {
  const [articleList, setArticleList] = useState<IArticleWithCategory[]>([]);

  const router = useRouter();

  const { isLoading, callApi } = useApiLoadingControl<IArticleWithCategory[]>();

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await callApi(api.getArticleList);
      setArticleList(articles);
    };
    fetchArticles();
  }, [callApi]);

  const handleMoveToDetail = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <S.Container>
      {isLoading && <Loading />}
      {articleList.map((article) => (
        <S.ArticleContainer
          key={article.id}
          onClick={() => handleMoveToDetail(article.id)}
        >
          <S.ThumbnailContainer>
            <Image
              src={article.thumbnailUrl || NoImage}
              alt="블로그 썸네일"
              width={100}
              height={100}
            />
          </S.ThumbnailContainer>
          <S.ContentContainer>
            <S.Title>{article.title}</S.Title>
            <S.CategoryDateContainer>
              <S.Category>[ {article.Category.name} ]</S.Category>
              <S.Date>{dayjs(article.date).format("YYYY.MM.DD")}</S.Date>
            </S.CategoryDateContainer>
          </S.ContentContainer>
        </S.ArticleContainer>
      ))}
    </S.Container>
  );
}
