"use client";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as S from "../_styles/Write.styles";
import { IWriteCategoryList } from "../types/WriteEditor.types";
import { useRouter } from "next/navigation";
import { IParams } from "../types/params.types";
import useApiLoadingControl from "../_utils/useApiLoadingControl";
import { IBlog } from "../types/Blog.types";
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
  const [blogDetail, setBlogDetail] = useState<IBlog>();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState<File | null>(null);
  const [blogContents, setBlogContents] = useState("");
  const [blogImages, setBlogImages] = useState<{ id: string; url: string }[]>(
    []
  );

  const quillRef = useRef<ReactQuill>(null);

  const router = useRouter();

  const { isLoading: isDetailLoading, callApi: callDetailApi } =
    useApiLoadingControl<IBlog>();
  const { isLoading: isCategoryListLoading, callApi: callCategoryListApi } =
    useApiLoadingControl<IWriteCategoryList[]>();
  const { isLoading: isWriteLoading, callApi: callWriteApi } =
    useApiLoadingControl<Response>();
  const { isLoading: isCategoryWriteLoading, callApi: callCategoryWriteApi } =
    useApiLoadingControl<Response>();

  useEffect(() => {
    if (params && params.blogId) {
      const fetchBlog = async () => {
        const blog = await callDetailApi(api.getArticle, params.blogId);
        setBlogTitle(blog.title);
        setBlogContents(blog.contents);
        setBlogDetail(blog);
      };
      fetchBlog();
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

      if (params && params.blogId) {
        const existingCategory = categoryListWithNew.find(
          (category) => category.id === blogDetail?.categoryId
        );
        if (existingCategory) {
          setSelectedCategory(existingCategory.id);
        }
      } else {
        setSelectedCategory(categoryListWithNew[0]?.id);
      }
    };

    fetchAndSetCategoryList();
  }, [callCategoryListApi, params, blogDetail]);

  const handleCategory = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.target instanceof HTMLSelectElement)
      setSelectedCategory(e.target.value);
    else if (e.target instanceof HTMLInputElement)
      setNewCategory(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogTitle(e.target.value);
  };

  const handleContentsChange = (value: string) => {
    setBlogContents(value);

    if (!quillRef.current) return;

    const editorHtml = quillRef.current?.getEditor().root.innerHTML;

    const imagesInEditor = exportContentsImageSources(editorHtml);
    const updatedBlogImages = blogImages.filter((image) =>
      imagesInEditor.includes(image.url)
    );

    if (updatedBlogImages.length !== blogImages.length)
      setBlogImages(updatedBlogImages);
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogThumbnail(e.target.files[0]);
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

        setBlogImages((prev) => [
          ...prev,
          { id: response.file.public_id, url: response.file.secure_url },
        ]);
      }
    };
  };

  const handleWriteBlog = async () => {
    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("contents", blogContents);

    if (selectedCategory !== "custom") {
      formData.append("categoryId", selectedCategory);
    } else {
      formData.append("newCategory", newCategory);
    }

    if (blogThumbnail) formData.append("thumbnail", blogThumbnail);

    const blogResponse = params?.blogId
      ? await callWriteApi(() => api.editArticle(params.blogId, formData))
      : await callWriteApi(() => api.writeArticle(formData));

    if (blogResponse.ok) {
      console.log("블로그 등록 성공");

      const blogResult = await blogResponse.json();
      router.push(`/${blogResult.blogId}`);
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
      {(isDetailLoading ||
        isCategoryListLoading ||
        isWriteLoading ||
        isCategoryWriteLoading) && <Loading />}
      <S.Title
        placeholder="제목을 입력하세요"
        onChange={handleTitleChange}
        value={blogTitle}
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
          value={blogContents}
          style={{ height: "95%" }}
          modules={modules}
          onChange={handleContentsChange}
        />
      </S.EditorContainer>

      <S.BottomContainer>
        <S.TextButton>돌아가기</S.TextButton>
        <S.TextButton onClick={handleWriteBlog}>
          {params.blogId ? "수정하기" : "작성하기"}
        </S.TextButton>
      </S.BottomContainer>
    </S.Container>
  );
}
