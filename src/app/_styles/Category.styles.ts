import styled from "styled-components";
import { breakPoints } from "./breakPoints";
import Image from "next/image";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 100px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    padding: 50px 50px;
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    padding: 50px 20px;
  }
`;

export const CategoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 15px;
  background-color: var(--white-color-400);
  border-radius: ${(props) => (props.$isOpen ? "15px 15px 0 0" : "15px")};
  font-size: var(--font-size-300);
  font-weight: 700;
  margin-bottom: ${(props) => (props.$isOpen ? "0" : "30px")};
  overflow: hidden;
  cursor: pointer;
`;

export const ArrowIcon = styled(Image)`
  width: 15px;
  height: 15px;
`;

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  gap: 25px;
  background-color: var(--secondary-color);
  border-radius: 0 0 15px 15px;
  margin-bottom: 30px;
`;

export const ArticleInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const ArticleTitle = styled.div`
  font-size: var(--font-size-400);
`;

export const ArticleDate = styled.div`
  font-size: var(--font-size-600);
  color: var(--white-color-700);

  @media screen and (max-width: ${breakPoints.medium}px) {
    font-size: var(--font-size-700);
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    font-size: 1.4rem;
  }
`;
