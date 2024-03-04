"use client";
import { useState } from "react";
import * as S from "../../_styles/Category.styles";
import { IOpenCategories } from "@/app/types/openCategories.types";
import upArrow from "../../../../public/icon_up-arrow.png";
import downArrow from "../../../../public/icon_down-arrow.png";
import { useRouter } from "next/navigation";

export default function Category() {
  const categoryList = [
    {
      id: 1,
      category: "category1",
      blog: [
        { id: 1, title: "blog1", date: "2024-03-04" },
        { id: 2, title: "blog2", date: "2024-03-04" },
      ],
    },
    {
      id: 2,
      category: "category2",
      blog: [{ id: 3, title: "blog1", date: "2024-03-04" }],
    },
    {
      id: 3,
      category: "category3",
      blog: [{ id: 4, title: "blog1", date: "2024-03-04" }],
    },
  ];

  const [openCategories, setOpenCategories] = useState<IOpenCategories>({});

  const router = useRouter();

  const handleOpenCategories = (id: number) => {
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
                  <S.BlogDate>{blog.date}</S.BlogDate>
                </S.BlogInfoContainer>
              ))}
            </S.BlogContainer>
          )}
        </S.CategoryListContainer>
      ))}
    </S.Container>
  );
}
