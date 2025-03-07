import { useTheme } from "../../context/theme-provider";
import { Github, Linkedin, PersonCircle } from "@styled-icons/bootstrap";
import * as S from "./styles";

export const Footer = () => {
  const { themeType } = useTheme();

  return (
    <S.FooterContainer themeType={themeType}>
      <S.FooterContent>
        <S.Copyright>
          © 2025 Marco Aurélio Duarte Bezerra. Todos os direitos reservados.
        </S.Copyright>
        <S.SocialLinks>
          <a
            href="https://github.com/marco-duart"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/aurelio-duart"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} />
          </a>
        </S.SocialLinks>
        <S.AboutLink to="/sobre-mim">
          <PersonCircle size={20} />
        </S.AboutLink>
      </S.FooterContent>
    </S.FooterContainer>
  );
};
