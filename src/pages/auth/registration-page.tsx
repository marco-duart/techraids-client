import * as S from "./styles";
import { IMAGES } from "../../utils/constants";
import { RegistrationForm } from "../../components/forms/registration-form";

export const RegistrationPage = () => {
  return (
    <S.PageContainer>
      <S.SmokeEffect />
      <S.ContentWrapper>
        <S.LogoContainer>
          <S.LogoImage src={IMAGES.logo} alt="Logo" />
          <S.LogoFrame />
        </S.LogoContainer>

        <S.FormWrapper>
          <RegistrationForm />
        </S.FormWrapper>
      </S.ContentWrapper>
    </S.PageContainer>
  );
};