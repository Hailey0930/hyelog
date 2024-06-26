"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.aside<{ $isSidebarOpen: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.$isSidebarOpen ? "280px" : "0px")};
  height: 100%;
  padding: ${(props) => (props.$isSidebarOpen ? "10px" : "0")};
  background-color: var(--secondary-color);
  transition: all 0.2s;
  overflow: hidden;

  @media screen and (max-width: ${breakPoints.small}px) {
    width: ${(props) => (props.$isSidebarOpen ? "100%" : "0px")};
  }
`;

export const HamburgerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 100px;
`;

export const Hamburger = styled.button`
  width: 25px;
  height: 25px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const ProfilePhoto = styled(Image)`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

export const ArticleTitle = styled.div`
  font-size: var(--font-size-300);
  font-weight: 700;
`;

export const ArticleSubTitle = styled.div`
  font-size: var(--font-size-500);
  font-weight: 500;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  height: 40px;
  padding: 10px;
  background-color: var(--white-color-400);
  border-radius: 10px;
  margin-top: 100px;
`;

export const LinkIconContainer = styled(Link)`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
`;

export const LinkIcon = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const LoginContainer = styled.div`
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 90%;
  height: 40px;
`;

export const LoginButton = styled.button`
  width: 20px;
  height: 20px;
`;
