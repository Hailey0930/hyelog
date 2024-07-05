"use client";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as S from "../_styles/Write.styles";
import { IWriteCategoryList } from "../types/WriteEditor.types";
import { useRouter } from "next/navigation";
import { IParams } from "../types/params.types";
import useApiLoadingControl from "../_utils/useApiLoadingControl";
import { IArticle } from "../types/Article.types";
import Loading from "./Loading";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { exportContentsImageSources } from "../_utils/exportContentsImageSrc";
import hljs from "highlight.js";
import "highlight.js/styles/panda-syntax-dark.css";
import { api } from "../_client/api";

export default function WriteEditComponent({ params }: IParams) {
  const [categoryList, setCategoryList] = useState<IWriteCategoryList[]>([]);
  // NOTE selectedCategory가 custom이면서 newCategory 값이 있으면 카테고리 등록 api도 태우기
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [articleDetail, setArticleDetail] = useState<IArticle>();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleThumbnail, setArticleThumbnail] = useState<File | null>(null);
  const [articleContents, setArticleContents] = useState("");
  const [articleImages, setArticleImages] = useState<
    { id: string; url: string }[]
  >([]);

  const quillRef = useRef<ReactQuill>(null);

  const router = useRouter();

  const { isLoading: isDetailLoading, callApi: callDetailApi } =
    useApiLoadingControl<IArticle>();
  const { isLoading: isCategoryListLoading, callApi: callCategoryListApi } =
    useApiLoadingControl<IWriteCategoryList[]>();
  const { isLoading: isWriteLoading, callApi: callWriteApi } =
    useApiLoadingControl<Response>();

  useEffect(() => {
    if (params && params.articleId) {
      const fetchArticle = async () => {
        const article = await callDetailApi(api.getArticle, params.articleId);
        setArticleTitle(article.title);
        setArticleContents(article.contents);
        setArticleDetail(article);
      };
      fetchArticle();
    }
  }, [callDetailApi, params]);

  useEffect(() => {
    const fetchAndSetCategoryList = async () => {
      const data = await callCategoryListApi(api.getCategoryList);

      const categoryListWithNew = data.map((el) => ({
        id: el.id,
        name: el.name,
      }));

      categoryListWithNew.push({
        id: "custom",
        name: "신규 등록",
      });

      setCategoryList(categoryListWithNew);

      if (params && params.articleId) {
        const existingCategory = categoryListWithNew.find(
          (category) => category.id === articleDetail?.categoryId
        );
        if (existingCategory) {
          setSelectedCategory(existingCategory.id);
        }
      } else {
        setSelectedCategory(categoryListWithNew[0]?.id);
      }
    };

    fetchAndSetCategoryList();
  }, [callCategoryListApi, params, articleDetail]);

  const handleCategory = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLSelectElement)
      setSelectedCategory(e.target.value);
    else if (e.target instanceof HTMLInputElement)
      setNewCategory(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value);
  };

  const handleContentsChange = (value: string) => {
    setArticleContents(value);

    if (!quillRef.current) return;

    const editorHtml = quillRef.current?.getEditor().root.innerHTML;

    const imagesInEditor = exportContentsImageSources(editorHtml);
    const updatedArticleImages = articleImages.filter((image) =>
      imagesInEditor.includes(image.url)
    );

    if (updatedArticleImages.length !== articleImages.length)
      setArticleImages(updatedArticleImages);
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArticleThumbnail(e.target.files[0]);
    }
  };

  const handleImagesChange = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : "";
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.uploadFile(formData);

      if (response) {
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();

        if (range)
          editor?.insertEmbed(range?.index, "image", response.file.secure_url);

        setArticleImages((prev) => [
          ...prev,
          { id: response.file.public_id, url: response.file.secure_url },
        ]);
      }
    };
  };

  const handleWriteArticle = async () => {
    const formData = new FormData();
    formData.append("title", articleTitle);
    formData.append("contents", articleContents);

    if (selectedCategory !== "custom") {
      formData.append("categoryId", selectedCategory);
    } else {
      formData.append("newCategory", newCategory);
    }

    if (articleThumbnail) formData.append("thumbnail", articleThumbnail);

    const articleResponse = params?.articleId
      ? await callWriteApi(() => api.editArticle(params.articleId, formData))
      : await callWriteApi(() => api.writeArticle(formData));

    if (articleResponse.ok) {
      console.log("블로그 등록 성공");

      const articleResult = await articleResponse.json();
      router.push(`/${articleResult.articleId}`);
    } else {
      console.log("블로그 등록 실패");
    }
  };

  hljs.configure({
    languages: ["javascript", "ruby", "python", "java", "cpp", "kotlin", "sql"],
  });

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [{ align: [] }],
          [{ color: [] }],
          ["code-block"],
          ["clean"],
        ],
        handlers: {
          image: handleImagesChange,
        },
      },
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value,
      },
    };
  }, []);

  return (
    <S.Container>
      {(isDetailLoading || isCategoryListLoading || isWriteLoading) && (
        <Loading />
      )}
      <S.Title
        placeholder="제목을 입력하세요"
        onChange={handleTitleChange}
        value={articleTitle}
      />
      <S.ThumbnailCategoryContainer>
        <S.ThumbnailContainer>
          <S.ThumbnailTitle>썸네일</S.ThumbnailTitle>
          <S.ThumbnailInput type="file" onChange={handleThumbnailChange} />
        </S.ThumbnailContainer>
        <S.ThumbnailContainer>
          <S.ThumbnailTitle>카테고리</S.ThumbnailTitle>
          <S.CategorySelectBox
            onChange={handleCategory}
            value={selectedCategory}
          >
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </S.CategorySelectBox>
          {selectedCategory === "custom" && (
            <S.CategoryInput value={newCategory} onChange={handleCategory} />
          )}
        </S.ThumbnailContainer>
      </S.ThumbnailCategoryContainer>
      <S.EditorContainer>
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={articleContents}
          style={{ height: "95%" }}
          modules={modules}
          onChange={handleContentsChange}
        />
      </S.EditorContainer>

      <S.BottomContainer>
        <S.TextButton>돌아가기</S.TextButton>
        <S.TextButton onClick={handleWriteArticle}>
          {params.articleId ? "수정하기" : "작성하기"}
        </S.TextButton>
      </S.BottomContainer>
    </S.Container>
  );
}
