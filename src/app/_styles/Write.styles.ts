import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc((var(--vh, 1vh) * 100) - 55px);
`;

export const Title = styled.input`
  width: calc(100% - 40px);
  height: 50px;
  font-size: var(--font-size-100);
  border: none;
  border-bottom: 1px solid var(--white-color-400);
  padding: 10px 15px;
  margin: 1px;
  margin-bottom: 5px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: var(--font-size-100);
    font-weight: 700;
    color: var(--white-color-700);
  }
`;

export const ThumbnailCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  height: 80px;
  padding: 0px 20px;
  gap: 15px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    height: 100px;
  }
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ThumbnailTitle = styled.div`
  font-size: var(--font-size-600);
  font-weight: 600;
`;

export const ThumbnailInput = styled.input`
  font-size: var(--font-size-700);
`;

export const CategorySelectBox = styled.select`
  width: 150px;
  height: 35px;
  font-size: var(--font-size-700);
`;

export const CategoryInput = styled.input`
  width: 150px;
  height: 30px;
  font-size: var(--font-size-700);
`;

export const EditorContainer = styled.div`
  width: 100%;
  height: calc(100% - 230px);

  @media screen and (max-width: ${breakPoints.medium}px) {
    height: calc(100% - 250px);
  }
`;

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: 50px;
  padding: 10px 20px;
  background-color: var(--secondary-color);
  border-top: 1px solid var(--white-color-700);
`;

export const TextButton = styled.button`
  font-size: var(--font-size-300);
  font-weight: 700;
`;
