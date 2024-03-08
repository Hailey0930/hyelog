"use client";
import Image from "next/image";
import * as S from "../_styles/Blog.styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlogList } from "../types/Blog.types";
import dayjs from "dayjs";
import { blogListAPI } from "../_client/api";

export default function Blog() {
  const [blogList, setBlogList] = useState<IBlogList[]>([]);

  const router = useRouter();

  useEffect(() => {
    blogListAPI().then((data) => setBlogList(data));
  }, []);

  const handleMoveToDetail = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <S.Container>
      {blogList.map((blog) => (
        <S.BlogContainer
          key={blog.id}
          onClick={() => handleMoveToDetail(blog.id)}
        >
          <S.ThumbnailContainer>
            <Image src={blog.thumbnail || ""} alt="블로그 썸네일" />
          </S.ThumbnailContainer>
          <S.ContentContainer>
            <S.Title>{blog.title}</S.Title>
            <S.Date>{dayjs(blog.date).format("YYYY.MM.DD")}</S.Date>
            <S.Contents>{blog.contents}</S.Contents>
          </S.ContentContainer>
        </S.BlogContainer>
      ))}
    </S.Container>
  );
}
