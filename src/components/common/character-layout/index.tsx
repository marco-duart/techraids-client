import { Outlet } from "react-router-dom";
import { Header } from "./header";
import * as S from "./styles";

export const CharacterLayout = () => {
  return (
    <S.CharacterLayoutContainer>
      <Header />

      <S.CharacterContent>
        <Outlet />
      </S.CharacterContent>
    </S.CharacterLayoutContainer>
  );
};
