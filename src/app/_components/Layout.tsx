"use client";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../_store/sidebarState";
import { useEffect } from "react";
import { setVH } from "../_utils/setVH";
import { breakPoints } from "../_styles/breakPoints";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSidebarOpen = useRecoilValue(sidebarState);

  useEffect(() => {
    window.addEventListener("resize", setVH);
    setVH();
  }, []);

  return (
    <Container>
      <Sidebar />
      <HeaderMainContainer $isSidebarOpen={isSidebarOpen}>
        <Header />
        <ContentContainer>{children}</ContentContainer>
      </HeaderMainContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc((var(--vh, 1vh) * 100));
  overflow: hidden;
`;

const HeaderMainContainer = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isSidebarOpen ? "calc(100% - 300px)" : "100%")};
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: ${breakPoints.small}px) {
    width: ${(props) => (props.$isSidebarOpen ? "0" : "100%")};
  }
`;

const ContentContainer = styled.article`
  overflow: auto;
`;
