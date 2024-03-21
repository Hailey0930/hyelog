"use client";
import Image from "next/image";
import * as S from "../_styles/Blog.styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IBlog } from "../types/Blog.types";
import dayjs from "dayjs";
import { blogListAPI } from "@/app/_client/api";
import NoImage from "../../../public/icon_noImage.png";
import useApiLoadingControl from "../_utils/useApiLoadingControl";
import Loading from "../_components/Loading";

export default function Blog() {
  const [blogList, setBlogList] = useState<IBlog[]>([]);

  const router = useRouter();

  const { isLoading, callApi } = useApiLoadingControl<IBlog[]>();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await callApi(blogListAPI);
      setBlogList(blogs);
    };
    fetchBlogs();
  }, [callApi]);

  const handleMoveToDetail = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <S.Container>
      {isLoading && <Loading />}
      {blogList.map((blog) => (
        <S.BlogContainer
          key={blog.id}
          onClick={() => handleMoveToDetail(blog.id)}
        >
          <S.ThumbnailContainer>
            <Image
              src={blog.thumbnailUrl || NoImage}
              alt="블로그 썸네일"
              width={100}
              height={100}
            />
          </S.ThumbnailContainer>
          <S.ContentContainer>
            <S.Title>{blog.title}</S.Title>
            <S.Date>{dayjs(blog.date).format("YYYY.MM.DD")}</S.Date>
          </S.ContentContainer>
        </S.BlogContainer>
      ))}
    </S.Container>
  );
}
