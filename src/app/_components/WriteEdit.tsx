"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as S from "../_styles/Write.styles";
import { IPreview, IWriteCategoryList } from "../types/WriteEditor.types";
import {
  blogDetailAPI,
  blogEditAPI,
  blogWriteAPI,
  categoryListAPI,
  categoryWriteAPI,
} from "../_client/api";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import CodeSyntax from "@toast-ui/editor-plugin-color-syntax";
import CodeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { breakPoints } from "../_styles/breakPoints";
import { useRouter } from "next/navigation";
import { IParams } from "../types/params.types";
import useApiLoadingControl from "../_utils/useApiLoadingControl";
import { IBlog } from "../types/Blog.types";
import Loading from "./Loading";
// import { fileUpload } from "../_utils/fileUpload";

export default function WriteEditComponent({ params }: IParams) {
  const [preview, setPreview] = useState<IPreview>("vertical");
  const [categoryList, setCategoryList] = useState<IWriteCategoryList[]>([]);
  // NOTE selectedCategory가 custom이면서 newCategory 값이 있으면 카테고리 등록 api도 태우기
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [blogDetail, setBlogDetail] = useState<IBlog>();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState<File | null>(null);
  const [blogContents, setBlogContents] = useState("");

  const editorRef = useRef<Editor>(null);

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
        const blog = await callDetailApi(blogDetailAPI, params.blogId);
        setBlogTitle(blog.title);
        setBlogContents(blog.contents);
        setBlogDetail(blog);
      };
      fetchBlog();
    }
  }, [callDetailApi, params]);

  useEffect(() => {
    if (params && params.blogId && blogContents) {
      const htmlString = blogContents;
      editorRef.current?.getInstance().setHTML(htmlString);
    }
  }, [params, blogContents]);

  useEffect(() => {
    const handleResize = () => {
      setPreview(window.innerWidth > breakPoints.medium ? "vertical" : "tab");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAndSetCategoryList = async () => {
      const data = await callCategoryListApi(categoryListAPI);

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

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogThumbnail(e.target.files[0]);
    }
  };

  // const handleImagesChange = async (
  //   blob: Blob | File,
  //   callback: (url: string, alt?: string) => void
  // ) => {
  //   const formData = new FormData();
  //   formData.append("image", blob);

  //   const image = formData.get("image") as File;
  //   const imageUrl = await fileUpload(image);

  //   try {
  //     callback(imageUrl?.secure_url || "", imageUrl?.public_id);
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //   }
  // };

  const handleWriteBlog = async () => {
    const blogContents = editorRef.current?.getInstance().getHTML();

    const createBlog = async (categoryId: string) => {
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("contents", blogContents);
      formData.append("categoryId", categoryId);

      if (blogThumbnail) formData.append("thumbnail", blogThumbnail);

      const blogResponse = params?.blogId
        ? await callWriteApi(() => blogEditAPI(params.blogId, formData))
        : await callWriteApi(() => blogWriteAPI(formData));

      if (blogResponse.ok) {
        console.log("블로그 등록 성공");

        const blogResult = await blogResponse.json();
        router.push(`/${blogResult.blogId}`);
      } else {
        console.log("블로그 등록 실패");
      }
    };

    // NOTE 신규 카테고리
    if (selectedCategory === "custom" && newCategory) {
      const categoryResponse = await callCategoryWriteApi(
        categoryWriteAPI,
        newCategory
      );

      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json();
        createBlog(categoryData.categoryId);
      }
    }
    // NOTE 기존 카테고리
    else {
      createBlog(selectedCategory);
    }
  };

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
        <Editor
          ref={editorRef}
          previewStyle={preview}
          initialValue={blogContents || " "}
          height="100%"
          initialEditType="markdown"
          useCommandShortcut={false}
          plugins={[
            [CodeSyntax],
            [CodeSyntaxHighlight, { highlighter: Prism }],
          ]}
          // hooks={{
          //   addImageBlobHook: (
          //     blob: Blob | File,
          //     callback: (url: string, alt?: string) => void
          //   ) => {
          //     handleImagesChange(blob, callback);
          //   },
          // }}
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
