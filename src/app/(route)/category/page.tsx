"use client";
import { useEffect, useState } from "react";
import * as S from "../../_styles/Category.styles";
import upArrow from "../../../../public/icon_up-arrow.png";
import downArrow from "../../../../public/icon_down-arrow.png";
import { useRouter } from "next/navigation";
import { ICategoryList, IOpenCategories } from "@/app/types/Category.types";
import dayjs from "dayjs";
import { categoryListAPI } from "@/app/_client/api";

export default function Category() {
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);
  const [openCategories, setOpenCategories] = useState<IOpenCategories>({});

  const router = useRouter();

  useEffect(() => {
    categoryListAPI().then((data) => setCategoryList(data));
  }, []);

  const handleOpenCategories = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMoveToBlog = (id: string) => {
    router.push(`${id}`);
  };

  return (
    <S.Container>
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
            <S.BlogContainer>
              {category.blogs.map((blog) => (
                <S.BlogInfoContainer
                  key={blog.id}
                  onClick={() => handleMoveToBlog(blog.id)}
                >
                  <S.BlogTitle>{blog.title}</S.BlogTitle>
                  <S.BlogDate>
                    {dayjs(blog.date).format("YYYY.MM.DD")}
                  </S.BlogDate>
                </S.BlogInfoContainer>
              ))}
            </S.BlogContainer>
          )}
        </S.CategoryListContainer>
      ))}
    </S.Container>
  );
}
