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

export const EditorContainer = styled.div`
  width: 100%;
  height: calc(100% - 150px);
`;

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 50px);
  height: 50px;
  padding: 10px 20px;
  background-color: var(--secondary-color);
  border-top: 1px solid var(--white-color-700);
`;

export const TextButton = styled.button`
  font-size: var(--font-size-300);
  font-weight: 700;
`;
