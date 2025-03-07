import * as S from "./styles";
import { IMAGES } from "../../utils/constants";
import { LoginForm } from "../../components/forms/login-form";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <S.PageContainer>
      <S.SmokeEffect />
      <S.ContentWrapper>
        <S.LogoContainer>
          <S.LogoImage src={IMAGES.logo} alt="Logo" />
          <S.LogoFrame />
        </S.LogoContainer>

        <S.FormWrapper>
          <LoginForm />
          <S.RegisterLink>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </S.RegisterLink>
        </S.FormWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};
