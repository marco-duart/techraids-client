import * as S from "./styles";
import { Book } from "@styled-icons/remix-fill";

const LoadingSpinner = () => {
  return (
    <S.LoadingContainer>
      <S.LoadingAnimation>
        <Book size={48} className="book-spin" />
        <span>Consultando os oráculos...</span>
      </S.LoadingAnimation>
    </S.LoadingContainer>
  );
};

export default LoadingSpinner;
