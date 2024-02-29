import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 100px;
  gap: 50px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    padding: 30px 50px;
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    padding: 30px 20px;
  }
`;

export const BlogContainer = styled.div`
  display: flex;
  align-items: center;
  height: 250px;
  background-color: var(--secondary-color);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;

  @media screen and (max-width: ${breakPoints.medium}px) {
    height: 220px;
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    height: 180px;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 30%;
  height: 100%;
  border: 1px solid gray;

  @media screen and (max-width: ${breakPoints.medium}px) {
    width: 40%;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding: 10px;
  gap: 15px;
`;

export const Title = styled.div`
  font-size: var(--font-size-400);
  font-weight: 700;

  @media screen and (max-width: ${breakPoints.small}px) {
    font-size: var(--font-size-600);
  }
`;

export const Date = styled.div`
  font-size: var(--font-size-700);
  color: var(--white-color-700);

  @media screen and (max-width: ${breakPoints.small}px) {
    font-size: 1.4rem;
  }
`;

export const Contents = styled.div`
  font-size: var(--font-size-500);
  margin-top: 30px;

  @media screen and (max-width: ${breakPoints.small}px) {
    font-size: var(--font-size-700);
  }
`;
