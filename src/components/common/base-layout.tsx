import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import * as S from "./styles";

export const BaseLayout = () => {
  return (
    <S.LayoutContainer>
      <Sidebar />
      <S.ContentWrapper>
        <S.MainContent>
          <Outlet />
        </S.MainContent>
        <Footer />
      </S.ContentWrapper>
    </S.LayoutContainer>
  );
};
