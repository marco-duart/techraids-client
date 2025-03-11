import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import * as S from "./styles";

export const NarratorLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <S.LayoutContainer>
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <S.ContentWrapper isCollapsed={isCollapsed}>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
        <Footer />
      </S.ContentWrapper>
    </S.LayoutContainer>
  );
};
