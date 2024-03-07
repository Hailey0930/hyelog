"use client";
import { useEffect, useState } from "react";
import * as S from "../../_styles/Category.styles";
import upArrow from "../../../../public/icon_up-arrow.png";
import downArrow from "../../../../public/icon_down-arrow.png";
import { useRouter } from "next/navigation";
import { ICategoryList, IOpenCategories } from "@/app/types/Category.types";
import { sleep } from "@/app/_utils/sleep";
import dayjs from "dayjs";

export default function Category() {
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);
  const [openCategories, setOpenCategories] = useState<IOpenCategories>({});

  const router = useRouter();

  useEffect(() => {
    fetchCategoryListAPI().then((data) => setCategoryList(data));
  }, []);

  const fetchCategoryListAPI = async () => {
    await sleep();

    return [
      {
        id: "1",
        category: "category1",
        blog: [
          { id: 1, title: "blog1", date: new Date() },
          { id: 2, title: "blog2", date: new Date() },
        ],
      },
    ];
  };

  const handleOpenCategories = (id: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMoveToBlog = (id: number) => {
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
            <p>{category.category}</p>
            <S.ArrowIcon
              src={openCategories[category.id] ? upArrow : downArrow}
              alt="dropdown"
            />
          </S.CategoryContainer>

          {openCategories[category.id] && (
            <S.BlogContainer>
              {category.blog.map((blog) => (
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
