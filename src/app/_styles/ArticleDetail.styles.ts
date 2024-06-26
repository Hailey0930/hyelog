import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 80px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    padding: 80px 30px;
  }
`;

export const ArticleContainer = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media screen and (max-width: ${breakPoints.medium}px) {
    width: ${(props) => (!props.$isSidebarOpen ? "75%" : "100%")};
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    width: 100%;
  }
`;

export const ArticleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 150px;
  gap: 30px;
`;

export const ArticleCategory = styled.div`
  font-size: var(--font-size-600);
`;

export const ArticleTitle = styled.div`
  font-size: 3.4rem;
  font-weight: 700;
`;

export const DateEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Date = styled.div`
  font-size: var(--font-size-600);
  color: var(--white-color-700);
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TextButton = styled.button`
  font-size: var(--font-size-600);
  font-weight: 600;
`;

export const ContentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ThumbnailContentsContainer = styled.div<{
  $isSidebarOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  gap: 50px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    width: ${(props) => (!props.$isSidebarOpen ? "75%" : "100%")};
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    width: 100%;
  }
`;

export const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 350px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    width: 100%;
  }
`;

export const Contents = styled.div`
  width: calc(100% - 20px);
  min-height: 300px;
  padding: 10px;
  border: 1px solid var(--white-color-500);
  border-radius: 5px;

  h1 {
    font-size: var(--font-size-200);
    font-weight: 600;
    margin: 10px 0;
  }

  h2 {
    font-size: var(--font-size-400);
    font-weight: 600;
    margin: 10px 0;
  }

  h3 {
    font-size: var(--font-size-500);
    font-weight: 600;
    margin: 10px 0;
  }

  h4 {
    font-size: var(--font-size-600);
    font-weight: 600;
    margin: 10px 0;
  }

  p {
    font-size: var(--font-size-600);
    margin-bottom: 5px;
  }

  strong {
    font-size: var(--font-size-600);
    font-weight: 600;
    margin-bottom: 5px;
  }

  pre {
    background-color: var(--white-color-800);
    border-radius: 5px;
    color: var(--white-color-100);
    padding: 10px 15px;
    font-size: var(--font-size-600);
    margin: 10px 0;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
    font-size: var(--font-size-600);
    margin-bottom: 5px;
  }
`;

export const ContentsHeaderContainer = styled.div<{ $isSidebarOpen: boolean }>`
  width: 20%;
  height: fit-content;
  padding: 10px;
  border-left: 2px solid var(--white-color-400);
  position: absolute;
  right: 0;

  @media screen and (max-width: ${breakPoints.medium}px) {
    display: ${(props) => (!props.$isSidebarOpen ? "flex" : "none")};
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    display: none;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;
`;

export const ContentsHeader = styled.div<{
  $level: number;
}>`
  font-size: ${({ $level }) =>
    $level === 1
      ? "var(--font-size-400)"
      : $level === 2
      ? "var(--font-size-500)"
      : $level === 3
      ? "var(--font-size-600)"
      : "var(--font-size-700)"};
  padding-left: ${({ $level }) =>
    $level === 1
      ? "0"
      : $level === 2
      ? "10px"
      : $level === 3
      ? "20px"
      : "30px"};
  color: var(--white-color-700);
`;
