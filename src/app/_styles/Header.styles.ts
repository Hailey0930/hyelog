import Link from "next/link";
import styled from "styled-components";
import { breakPoints } from "./breakPoints";

export const Container = styled.header`
  display: flex;
  align-items: center;
  height: 35px;
  padding: 10px 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: ${breakPoints.small}px) {
    gap: 20px;
  }
`;

export const Hamburger = styled.button`
  width: 25px;
  height: 25px;
`;

export const Menu = styled(Link)`
  font-size: var(--font-size-200);
  font-weight: 700;
  padding: 7px 15px;
  border-radius: 10px;

  &.current {
    background-color: var(--primary-color);
    color: var(--white-color-100);
  }

  @media screen and (max-width: ${breakPoints.small}px) {
    font-size: var(--font-size-300);
  }
`;
