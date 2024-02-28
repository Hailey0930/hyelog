"use client";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { RecoilRoot } from "recoil";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>
      <Container>
        <Sidebar />
        <HeaderMainContainer>
          <Header />
          <article>{children}</article>
        </HeaderMainContainer>
      </Container>
    </RecoilRoot>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const HeaderMainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
