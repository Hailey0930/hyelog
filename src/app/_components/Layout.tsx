"use client";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { sidebarState } from "../_store/sidebarState";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSidebarOpen = useRecoilValue(sidebarState);

  return (
    <Container>
      <Sidebar />
      <HeaderMainContainer $isSidebarOpen={isSidebarOpen}>
        <Header />
        <article>{children}</article>
      </HeaderMainContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const HeaderMainContainer = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isSidebarOpen ? "calc(100% - 300px)" : "100%")};
  height: 100%;
`;
