"use client";
import * as S from "../_styles/Sidebar.styles";
import { useRecoilState } from "recoil";
import { sidebarState } from "../_store/sidebarState";
import Image from "next/image";
import {
  hamburger,
  icon_email,
  icon_github,
  icon_linkedin,
  profile,
} from "../../../public/sidebar/sidebarImage";
import loginIcon from "../../../public/icon_login.png";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const linkArray = [
    {
      name: "github",
      url: "https://github.com/Hailey0930",
      icon: icon_github,
    },
    {
      name: "linkedIn",
      url: "https://www.linkedin.com/in/%ED%98%9C%EB%A6%B0-%EC%A0%84-048868269",
      icon: icon_linkedin,
    },
    { name: "email", url: "mailto:hyerin0930@gmail.com", icon: icon_email },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);

  const router = useRouter();

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMoveToLogin = () => {
    router.push("/login");
  };

  return (
    <S.Container $isSidebarOpen={isSidebarOpen}>
      <S.HamburgerContainer>
        <S.Hamburger onClick={handleSidebarOpen}>
          <Image src={hamburger} alt="햄버거 아이콘" />
        </S.Hamburger>
      </S.HamburgerContainer>
      <S.ProfileContainer>
        <S.ProfilePhoto src={profile} alt="프로필 사진" />
        <S.BlogTitle>Hyerin&apos;s Blog</S.BlogTitle>
        <S.BlogSubTitle>개발을 개발새발~</S.BlogSubTitle>
      </S.ProfileContainer>
      <S.LinkContainer>
        {linkArray.map((link) => (
          <S.LinkIconContainer
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.LinkIcon src={link.icon} alt={link.name} />
          </S.LinkIconContainer>
        ))}
      </S.LinkContainer>
      <S.LoginContainer>
        <S.LoginButton onClick={handleMoveToLogin}>
          <Image src={loginIcon} alt="로그인 버튼" />
        </S.LoginButton>
      </S.LoginContainer>
    </S.Container>
  );
}
