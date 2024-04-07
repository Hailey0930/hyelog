"use client";
import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../../_styles/Login.styles";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "@/app/_utils/cookie";

export default function Login() {
  const BLOG_ID = process.env.NEXT_PUBLIC_BLOG_ID;
  const BLOG_PW = process.env.NEXT_PUBLIC_BLOG_PW;

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const router = useRouter();

  useEffect(() => {
    const login = getCookie("login");

    if (login) {
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "id") setId(value);
    else if (id === "pw") setPw(value);
  };

  const handleLogin = () => {
    if (BLOG_ID !== id || BLOG_PW !== pw) {
      window.alert("로그인 실패");
    } else {
      setCookie("login", "true", 1);
      router.push("/");
    }
  };

  return (
    <S.Container>
      <S.InputContainer>
        <S.Input placeholder="아이디" id="id" onChange={handleInputChange} />
        <S.Input
          placeholder="비밀번호"
          type="password"
          id="pw"
          onChange={handleInputChange}
        />
        <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
      </S.InputContainer>
    </S.Container>
  );
}
