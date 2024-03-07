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

export const BlogContainer = styled.div<{ $isSidebarOpen: boolean }>`
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

export const BlogInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 130px;
  gap: 50px;
`;

export const BlogTitle = styled.div`
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
  width: 100%;
  height: 350px;
  border: 1px solid blue;
`;

export const Contents = styled.div`
  width: calc(100% - 20px);
  min-height: 300px;
  padding: 10px;
  border: 1px solid var(--white-color-500);
  border-radius: 5px;
`;

export const IndexContainer = styled.div<{ $isSidebarOpen: boolean }>`
  width: 20%;
  height: fit-content;
  padding: 30px 10px;
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

export const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
`;

export const Index = styled.div<{ $level: number }>`
  font-size: ${({ $level }) =>
    $level === 1
      ? "var(--font-size-200)"
      : $level === 2
      ? "var(--font-size-300)"
      : $level === 3
      ? "var(--font-size-400)"
      : "var(--font-size-500)"};
  padding-left: ${({ $level }) =>
    $level === 1
      ? "0"
      : $level === 2
      ? "10px"
      : $level === 3
      ? "20px"
      : "30px"};
  color: var(--white-color-700);
  cursor: pointer;
`;
