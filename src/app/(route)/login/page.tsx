"use client";
import { ChangeEvent, useEffect, useState } from "react";
import * as S from "../../_styles/Login.styles";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/app/_store/loginState";
import { useRouter } from "next/navigation";

export default function Login() {
  const BLOG_ID = process.env.NEXT_PUBLIC_BLOG_ID;
  const BLOG_PW = process.env.NEXT_PUBLIC_BLOG_PW;

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const setLogin = useSetRecoilState(loginState);

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "id") setId(value);
    else if (id === "pw") setPw(value);
  };

  const handleLogin = () => {
    if (BLOG_ID !== id || BLOG_PW !== pw) {
      window.alert("로그인 실패");
    } else {
      setLogin(true);
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
