"use client";
import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../_styles/Write.styles";
import { sleep } from "../_utils/sleep";
import { IWriteCategoryList, IWriteProps } from "../types/WriteEditor.types";
import WriteEditor from "./WriteEditor";

export default function WriteEditComponent({
  title,
  contents,
  thumbnail,
}: IWriteProps) {
  const [categoryList, setCategoryList] = useState<IWriteCategoryList[]>([]);
  // NOTE selectedCategory가 custom이면서 newCategory 값이 있으면 카테고리 등록 api도 태우기
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchAndSetCategoryList = async () => {
      const data = await fetchCategoryListAPI();

      const categoryListWithNew = data.map((el) => ({
        id: el.id,
        category: el.category,
        value: el.category,
      }));

      categoryListWithNew.push({
        id: "custom",
        category: "신규 등록",
        value: "custom",
      });

      setCategoryList(categoryListWithNew);
      setSelectedCategory(categoryList[0]?.value);
    };

    fetchAndSetCategoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCategory = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLSelectElement)
      setSelectedCategory(e.target.value);
    else if (e.target instanceof HTMLInputElement)
      setNewCategory(e.target.value);
  };

  return (
    <S.Container>
      <S.Title placeholder="제목을 입력하세요" />
      <S.ThumbnailCategoryContainer>
        <S.ThumbnailContainer>
          <S.ThumbnailTitle>썸네일</S.ThumbnailTitle>
          <S.ThumbnailInput type="file" />
        </S.ThumbnailContainer>
        <S.ThumbnailContainer>
          <S.ThumbnailTitle>카테고리</S.ThumbnailTitle>
          <S.CategorySelectBox onChange={handleCategory}>
            {categoryList.map((category) => (
              <option key={category.id} value={category.value}>
                {category.category}
              </option>
            ))}
          </S.CategorySelectBox>
          {selectedCategory === "custom" && (
            <S.CategoryInput value={newCategory} onChange={handleCategory} />
          )}
        </S.ThumbnailContainer>
      </S.ThumbnailCategoryContainer>
      <S.EditorContainer>
        <WriteEditor />
      </S.EditorContainer>

      <S.BottomContainer>
        <S.TextButton>돌아가기</S.TextButton>
        <S.TextButton>작성하기</S.TextButton>
      </S.BottomContainer>
    </S.Container>
  );
}
