import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 100px;
  height: 100%;

  @media screen and (max-width: ${breakPoints.medium}px) {
    padding: 50px 50px;
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    padding: 50px 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  height: 400px;
  background-color: var(--white-color-300);
  border-radius: 10px;

  @media screen and (max-width: ${breakPoints.medium}px) {
    width: 80%;
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  width: 50%;
  height: 30px;
  padding: 10px;
  font-size: var(--font-size-700);
  outline: none;
  border: none;
  border-radius: 5px;

  @media screen and (max-width: ${breakPoints.small}px) {
    width: 70%;
  }

  &:focus {
    border: 1px solid var(--primary-color);
  }

  &::placeholder {
    font-size: var(--font-size-700);
    color: var(--white-color-500);
  }
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 30px;
  padding: 10px;
  font-size: var(--font-size-500);
  font-weight: 700;
  background-color: var(--secondary-color);
  border-radius: 10px;

  &:hover {
    background-color: var(--white-color-600);
  }
`;
