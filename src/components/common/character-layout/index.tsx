import { Outlet } from "react-router-dom";
import { useTheme } from "../../../context/theme-provider";
import { Header } from "./header";
import * as S from "./styles";

export const CharacterLayout = () => {
  const { themeType } = useTheme();

  return (
    <S.CharacterLayoutContainer themeType={themeType}>
      <Header />

      <S.CharacterContent>
        <Outlet />
      </S.CharacterContent>
    </S.CharacterLayoutContainer>
  );
};
