"use client";
import Image from "next/image";
import * as S from "../_styles/Blog.styles";
import { useRouter } from "next/navigation";

export default function Blog() {
  const blogList = [
    {
      id: 1,
      title: "제목",
      contents: "내용",
      date: "2024.02.29",
      thumbnail: "",
    },
    {
      id: 2,
      title: "제목",
      contents: "내용",
      date: "2024.02.29",
      thumbnail: "",
    },
    {
      id: 3,
      title: "제목",
      contents: "내용",
      date: "2024.02.29",
      thumbnail: "",
    },
    {
      id: 4,
      title: "제목",
      contents: "내용",
      date: "2024.02.29",
      thumbnail: "",
    },
  ];

  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => console.log("data", data));
  // }, []);

  const router = useRouter();

  const handleMoveToDetail = (id: number) => {
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
            <Image src={blog.thumbnail} alt="블로그 썸네일" />
          </S.ThumbnailContainer>
          <S.ContentContainer>
            <S.Title>{blog.title}</S.Title>
            <S.Date>{blog.date}</S.Date>
            <S.Contents>{blog.contents}</S.Contents>
          </S.ContentContainer>
        </S.BlogContainer>
      ))}
    </S.Container>
  );
}
