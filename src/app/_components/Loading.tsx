import Image from "next/image";
import styled from "styled-components";
import spinIcon from "../../../public/icon_spin.gif";

export default function Loading() {
  return (
    <Container>
      <Image src={spinIcon} alt="로딩 spin" />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  width: 180px;
  height: 180px;
`;
