"use client";
import { useEffect, useState } from "react";
import * as S from "../../_styles/Category.styles";
import upArrow from "../../../../public/icon_up-arrow.png";
import downArrow from "../../../../public/icon_down-arrow.png";
import { useRouter } from "next/navigation";
import { ICategoryList, IOpenCategories } from "@/app/types/Category.types";
import dayjs from "dayjs";
import useApiLoadingControl from "@/app/_utils/useApiLoadingControl";
import Loading from "@/app/_components/Loading";
import { api } from "@/app/_client/api";

export default function Category() {
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);
  const [openCategories, setOpenCategories] = useState<IOpenCategories>({});

  const router = useRouter();

  const { isLoading, callApi } = useApiLoadingControl<ICategoryList[]>();

  useEffect(() => {
    const fetchCategoryList = async () => {
      const categoryList = await callApi(api.getCategoryList);
      setCategoryList(categoryList);
    };
    fetchCategoryList();
  }, [callApi]);

  const handleOpenCategories = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMoveToArticle = (id: string) => {
    router.push(`${id}`);
  };

  return (
    <S.Container>
      {isLoading && <Loading />}
      {categoryList.map((category) => (
        <S.CategoryListContainer key={category.id}>
          <S.CategoryContainer
            onClick={() => handleOpenCategories(category.id)}
            $isOpen={openCategories[category.id]}
          >
            <p>{category.name}</p>
            <S.ArrowIcon
              src={openCategories[category.id] ? upArrow : downArrow}
              alt="dropdown"
            />
          </S.CategoryContainer>

          {openCategories[category.id] && (
            <S.ArticleContainer>
              {category.articles.map((article) => (
                <S.ArticleInfoContainer
                  key={article.id}
                  onClick={() => handleMoveToArticle(article.id)}
                >
                  <S.ArticleTitle>{article.title}</S.ArticleTitle>
                  <S.ArticleDate>
                    {dayjs(article.date).format("YYYY.MM.DD")}
                  </S.ArticleDate>
                </S.ArticleInfoContainer>
              ))}
            </S.ArticleContainer>
          )}
        </S.CategoryListContainer>
      ))}
    </S.Container>
  );
}
