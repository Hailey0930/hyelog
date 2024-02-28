import { useRecoilState } from "recoil";
import * as S from "../_styles/Header.styles";
import { sidebarState } from "../_store/sidebarState";
import Image from "next/image";
import { hamburger } from "../../../public/sidebar/sidebarImage";
import { useEffect } from "react";
import { breakPoints } from "../_styles/breakPoints";
import { usePathname } from "next/navigation";

export default function Header() {
  const menuArray = [
    { name: "Blog", path: "/" },
    { name: "Category", path: "/category" },
    { name: "About", path: "/about" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(sidebarState);

  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakPoints.small) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  const handleHamburger = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <S.Container>
      <S.MenuContainer>
        {!isSidebarOpen && (
          <S.Hamburger onClick={handleHamburger}>
            <Image src={hamburger} alt="햄버거 아이콘" />
          </S.Hamburger>
        )}
        {menuArray.map((menu) => (
          <S.Menu
            key={menu.name}
            href={menu.path}
            className={pathname === menu.path ? "current" : ""}
          >
            {menu.name}
          </S.Menu>
        ))}
      </S.MenuContainer>
    </S.Container>
  );
}